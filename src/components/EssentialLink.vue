<template>
  <q-item clickable tag="a" target="_blank" :href="link" :class="isActive(link)" class="sidebar-links q-pa-md">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>

  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  methods: {
    isActive(link: string) {
      //:TODO write url logic
      return (link === '/') ? 'active' : 'inactive'
    }
  }
});
</script>
<style lang="scss">
.sidebar-links {
  border-radius: 0px 25px 25px 0px;
  font-size: medium;
  font-weight: 600;

  &:hover {
    color: $white;
    background-color: $dark;
  }
}

.sidebar-links.active {
  color: $white;
  background-color: $dark;
}
</style>