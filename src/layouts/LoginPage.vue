<template>
    <q-layout view="lHh Lpr fff">
        <q-page class="window-height window-width row justify-center items-center">
            <div class="column q-pa-lg">
                <div class="row">
                    <q-card :bordered="false" style="width:400px;">
                        <q-card-section class="text-center">
                            <h4 class="text-h4 text-weight-bold">{{ $t('login.title') }}</h4>
                        </q-card-section>
                        <q-card-section>
                            <q-form class="q-gutter-md">
                                <q-input v-model="form.email" filled ref="emailRef" clearable type="email" lazy-rules
                                    :label="$t('login.email')" :rules="[required]" :error="errors.email.length > 0"
                                    :error-message="errors.email">

                                </q-input>
                                <q-input v-model="form.password" ref="passwordRef" filled :type="passwordFieldType"
                                    :label="$t('login.password')" :rules="[required]" lazy-rules
                                    :error="errors.password.length > 0" :error-message="errors.password">

                                    <template v-slot:append>
                                        <span class="text-caption" v-if="passwordFieldType == 'password'"
                                            :name="visibilityIcon" @click="switchVisibility">
                                            {{ $t('login.show') }}
                                        </span>
                                        <span class="text-caption" v-else :name="visibilityIcon"
                                            @click="switchVisibility">
                                            {{ $t('login.hide') }}
                                        </span>
                                    </template>
                                </q-input>
                            </q-form>
                        </q-card-section>

                        <q-card-actions class="q-px-lg">
                            <q-btn unelevated rounded no-caps size="lg" color="dark" class="full-width"
                                :label="$t('login.title')" @click="submit" />
                        </q-card-actions>
                    </q-card>
                </div>
            </div>

        </q-page>
    </q-layout>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { mapActions, useStore } from 'vuex';
import { Platform } from 'quasar'

export default defineComponent({
    name: 'LoginPage',
    data() {
        return {
            form: {
                email: 'test@abc.com',//:todo remove these
                password: '123456' //:todo remove these
            },
            errors: {
                email: '',
                password: ''
            } as Record<string, string>,
            register: false,
            passwordFieldType: 'password',
            visibility: false,
            visibilityIcon: 'visibility'
        }
    },
    computed: {
    },
    methods: {
        ...mapActions('users', ['login']),
        required(val: string) {
            return (val && val.length > 0 || this.$t('form.required'))
        },
        getPlatform(): string {
            const platform = Platform.is
            return platform.name + ', ' + platform.platform;
        },
        async submit() {
            this.emailRef.validate();
            this.passwordRef.validate();

            if (!this.emailRef.hasError
                && (!this.passwordRef.hasError)) {

                let formData: Record<string, string> = this.form;
                formData.device_name = this.getPlatform()

                this.login(formData).then(data => {
                    //Login Successful redirect him to main
                    console.log(data);
                    this.$router.push('/');
                }).catch(error => {
                    //caught feild error from server
                    const errors = error.response.data.errors;
                    for (const i in errors) {
                        this.errors[i] = errors[i][0];
                    }
                })
            }
        },
        switchVisibility() {
            this.visibility = !this.visibility
            this.passwordFieldType = this.visibility ? 'text' : 'password'
            this.visibilityIcon = this.visibility ? 'visibility_off' : 'visibility'
        }
    },
    setup() {
        const $q = useQuasar()
        const $store = useStore()

        const emailRef = ref();
        const passwordRef = ref();
        return {
            $q,
            emailRef,
            passwordRef,
            $store
        }
    }
});
</script>
<style lang="scss" scoped>
.q-card {
    border: none;
    box-shadow: none;
}
</style>
