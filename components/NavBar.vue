<template lang="pug">
  v-card
    v-toolbar(dark flat)
      v-toolbar-title Test for Code Constraction
      template(v-slot:extension)
        v-tabs(v-model="tab" align-with-title)
          v-tabs-slider(color="blue")
          v-tab(v-for="item in items" :key="item.id" :to="item.to")
            | {{ item.title }}
</template>

<script>
  export default {
    name: 'NavBar',
    data () {
      return {
        tab: null,
        items: [
          {
            id: 'users',
            title: 'Пользователи',
            to: "/users"
          },
          {
            id: 'posts',
            title: 'Посты',
            to: "/posts"
          }
        ]
      }
    },
  }
</script>
