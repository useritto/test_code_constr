<template lang="pug">
  v-card.post-card(dark)
    .d-flex.flex-no-wrap.justify-space-between
      div
        v-card-title.post-card__id.text-h5 Пост # {{ post.id }}
        v-card-subtitle.post-card__title Заголовок: {{ post.title }}
        v-card-text.post-card__body {{ post.body }}
    v-card-actions.post-card__actions-container
      v-btn.post-card__btn-open(color="primary" nuxt :to="`/posts/${post.id}`" v-bind:perId="post.userId")
        | Открыть
</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: Object
  }
}
</script>

<style scoped>

</style>
