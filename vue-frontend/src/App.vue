<script lang="ts">

import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: { NavBar, Footer },
})

</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <NavBar />
    <router-view class="container max-w-8xl mx-auto mb-auto px-4" />
    <Footer />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
