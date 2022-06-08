<template>
  <div>
    <h6 class="text-btn-title">{{ title }}</h6>
    <!-- Active Todos -->
    <q-list v-if="active == true">

      <q-slide-item left-class="q-pl-none q-pr-none" right-color="grey-11" left-color="grey-11" @left="itemSlide"
        @right="itemSlide" v-for="todo in todos" :key="todo.id" tag="label">
        <template v-slot:left>
          <q-btn unelevated class="q-py-md" icon="edit" stack color="orange" @click="editTodo(todo.id)" />
        </template>
        <template v-slot:right>
          <q-btn unelevated class="q-py-md" icon="delete" stack color="red" @click="deleteTodo(todo.id)" />
        </template>

        <q-item>
          <q-item-section avatar>
            <q-checkbox @update:model-value="completeTodo(todo.id)" checked-icon="check" dense v-model="checkedTask"
              :val="todo.id" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ todo.content }}</q-item-label>
            <q-item-label caption>
              <!-- :TODO Get alarm icon form a SVG icon -->
              <span>⏰</span>{{ dateFormat(todo.date) }}
            </q-item-label>
          </q-item-section>
        </q-item>

      </q-slide-item>
    </q-list>

    <!-- Inactive Todos -->
    <q-list v-if="active == false">
      <q-item disable v-for="todo in todos" :key="todo.id" tag="label">
        <q-item-section avatar>
          <q-checkbox disable dense v-model="completedTask" disabled="true" />
        </q-item-section>
        <q-item-section>
          <q-item-label color="gray">{{ todo.content }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  PropType,
  ref,
} from 'vue';
import { mapActions, useStore } from 'vuex';
import { Todo } from './models';

function dateFormat(date: any) {
  //:TODO format date as per the UI
  const datetime = Date.parse(date);
  let formateddate = new Date(datetime);
  if (isToday(formateddate))
    return "Today";

  if (isTommorow(formateddate))
    return "Tommorow";

  return formateddate.toLocaleString('en-US')
}

//:TODO Refactor helper functions
function isToday(inputDate: Date) {
  const today = new Date()
  return inputDate.getDate() == today.getDate() &&
    inputDate.getMonth() == today.getMonth() &&
    inputDate.getFullYear() == today.getFullYear()
}
//:TODO Refactor helper functions
function isTommorow(inputDate: Date) {
  const tommorow = new Date()
  tommorow.setDate(tommorow.getDate() + 1);
  return inputDate.getDate() == tommorow.getDate() &&
    inputDate.getMonth() == tommorow.getMonth() &&
    inputDate.getFullYear() == tommorow.getFullYear()
}



export default defineComponent({
  name: 'TasksComponent',
  emits: ['update:listernModal'],
  props: {
    title: {
      type: String,
      required: true
    },
    todos: {
      type: Array as PropType<Todo[]>,
      default: () => []
    },
    active: {
      type: Boolean
    }
  },
  setup() {
    // eslint-disable-next-line 
    let timer: any;
    const $store = useStore()
    // eslint-disable-next-line 
    function finalize(reset: any) {
      timer = setTimeout(() => {
        reset()
      }, 3000)
    }

    onBeforeUnmount(() => {
      clearTimeout(timer)
    })

    return {
      checkedTask: ref([]),
      completedTask: ref(true),
      dateFormat,
      finalize,
      $store,
      // eslint-disable-next-line 
      itemSlide({ reset }: any) {
        finalize(reset)
      },
      ...mapActions('datastore', ['completeTodo', 'deleteTodo'])
    }
  },
  methods: {
    editTodo(id: number) {
      this.$store.dispatch('datastore/setEditVal', id);
      //display modal
      this.$emit("update:listernModal", true);

    }
  }
});
</script>
<style lang="scss" scoped>
.slider-button {
  height: 100%;
}

.q-slide-item__left {
  padding-left: none !important;
}

.q-slide-item__left.absolute-full {
  padding-left: 0px !important;
}
</style>