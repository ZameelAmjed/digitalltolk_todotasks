<template>
  <q-layout view="lHh Lpr lFf" class="horizontal-menu bg-gray">
    <q-header class="bg-transparent text-black">
      <q-toolbar>
        <!-- :todo this is button for menu<q-btn flat round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer class="max-drawer-size" v-model="leftDrawerOpen" show-if-above>
      <div class="q-mt-lg"></div>
      <q-list>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
      <!-- Logout Button -->
      <div class="toolbar fixed-bottom">
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon clickable @click="logOut()" class="cursor-pointer" name="logout" />
            </q-item-section>

            <q-item-section>
              <q-item-label><span clickable @click="logOut()" class="cursor-pointer">{{ $t('main.logout') }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

      </div>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Task',
    icon: 'content_paste',
    link: '/'
  },
  {
    title: 'Location',
    icon: 'pin_drop',
    link: '/location'
  }
];

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('users/logOut')
      this.$router.push('/Login');
    }
  }
});
</script>
