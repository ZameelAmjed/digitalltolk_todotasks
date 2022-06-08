<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  watch: {
    //:TODO for more serious auth run a wather here
    //init push notification here...
    // isAuthenticated(value){
    //this.$store.getters.users.isAuthenticated()
    //}
  }
})
</script>
