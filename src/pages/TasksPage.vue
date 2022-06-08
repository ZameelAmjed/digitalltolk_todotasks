<template>
  <q-page class="">
    <div class="row">
      <q-btn @click="toggleTaskModal" push flat color="gray" padding="xs" class="btn--no-hover btn-textual" noCaps>+ Add
        new task
      </q-btn>
    </div>
    <task-component @update:listernModal="toggleTaskModal" title="Incomplete" active :todos="todos"></task-component>
    <task-component title="Complete" :active="false" :todos="completedTodos"></task-component>
    <new-task-component @update:listernModal="toggleTaskModal" :showTaskModal="showTaskModal"></new-task-component>
  </q-page>
</template>

<script lang="ts">
import TaskComponent from 'components/TasksComponent.vue';
import { defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import NewTaskComponent from 'components/NewTaskComponent.vue';

export default defineComponent({
  name: 'TasksPage',
  components: { TaskComponent, NewTaskComponent },

  data() {
    return {
      showTaskModal: false
    }
  },
  methods: {
    toggleTaskModal() {
      this.showTaskModal = !this.showTaskModal;
    },
  },
  setup() {
    const $store = useStore()

    return {
      $store,

    };
  },
  async mounted() {
    await this.$store.dispatch('datastore/getTodos')
    await this.$store.dispatch('datastore/getCompletedTodos')
  },
  computed: {
    ...mapGetters('datastore', ['todos', 'completedTodos'])
  }
});
</script>
<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>