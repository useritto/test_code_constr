<template lang="pug">
  v-app(dark)
    NavBar
    v-main
      v-container
        Nuxt
</template>

<script>
import NavBar from '/components/NavBar.vue';
export default {
    name: "DefaultLayout",
    components: { NavBar }
}
</script>
