<template>
    <q-dialog @before-show="setEditData" :before-close="handleClose" v-model="showTask">
        <q-card>
            <h6 class="text-h6 text-weight-bold q-my-xs q-py-sm q-px-sm">{{ $t('main.newtask') }}</h6>

            <q-card-section class="q-pt-none q-mx-xl">
                <q-input v-model="form.summery" label="Summery" :input-style="{ width: '300px' }">
                    <template v-slot:prepend>
                        <q-icon size="xs" name="chat" />
                    </template>
                </q-input>
                <q-input v-model="form.description" label="Description">
                    <template v-slot:prepend>
                        <q-icon size="xs" name="segment" />
                    </template>
                </q-input>
                <q-input v-model="form.duedate" mask="datetime" label="Time">
                    <template v-slot:prepend>
                        <q-icon size="xs" name="schedule" />
                    </template>
                </q-input>
            </q-card-section>
            {{ $store.getters['datastore/editTodo'] }}
            <q-card-actions class="q-px-lg">
                <q-btn unelevated rounded no-caps size="md" color="dark" class="full-width q-my-sm"
                    :label="$t('main.save')" @click="submit()" />
                <q-btn unelevated flat no-caps size="md" class="full-width" :label="$t('main.cancel')"
                    @click="handleClose" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'NewTaskComponent',
    props: {
        showTaskModal: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            form: {
                summery: '',
                description: '',
                duedate: '',
            },
            editId: 0
        }
    },
    computed: {

        showTask() {
            return this.showTaskModal
        }

    },
    emits: ['update:listernModal'],
    methods: {
        handleClose() {
            this.$emit("update:listernModal", false);
        },
        async submit() {
            //:TODO `validate client side form
            //:TODO `add more constraints on date type

            const str: string = this.form.duedate as string;
            str.replace(/\\/g, '-')

            if (this.editId === 0) {
                await this.$store.dispatch('datastore/saveNewTodo', { summery: this.form.summery, duedate: new Date(str) });
            } else {
                await this.$store.dispatch('datastore/saveEditedTodo', { id: this.editId, summery: this.form.summery, duedate: new Date(str) });
            }

            this.clearForm();
            this.handleClose();
        },
        setEditData() {
            const editData = this.$store.getters['datastore/editTodo'];
            if (editData.id !== 0) {
                this.form.summery = editData.content;
                this.form.description = '';
                this.form.duedate = editData.date;
                this.editId = editData.id;
            }
        },
        clearForm() {
            this.form.summery = '';
            this.form.description = '';
            this.form.duedate = '';
        }
    },
    setup() {
        const $store = useStore()
        return {
            $store,
        }
    }
});
</script>