<template lang="pug">
  div
    v-row(dense)
      v-col(cols='12')
        v-card.post-card(v-if="post && user" dark)
          v-app-bar(dark color="dark")
            v-btn(icon tile depressed nuxt plain to="/posts" color="primary")
              v-icon mdi-chevron-left
            v-toolbar-title Пост пользователя {{ user.name }} # {{ post.id }}
            v-spacer

          .d-flex.flex-no-wrap.justify-space-between
            div
              v-card-subtitle.text-h5 {{ post.title }}
              v-card-text {{ post.body }}
        v-col(v-if="comments" cols='9')
          v-card.mb-3(v-for="comment in comments" :key="comment.id" dark max-width="700")
            .d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.text-h5 Комментарий # {{ comment.id }}
                v-card-subtitle Почта пользователя: {{ comment.email }}
                v-card-text {{ comment.body }}
</template>

<script>
export default {
  name: 'PostPage',
  data() {
    return {
      user: null,
      post: null,
      comments: null,
    }
  },
  computed: {
    postId() {
      return this.$route.params.id
    },
    userId() {
      return this.post?.userId
    }
  },
  async fetch() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      await this.getPost();
      this.fetchUser();
      this.fetchComments();
    },
    async getPost() {
      this.post = await this.$api.posts.postGet({
        id: this.postId
      });
    },
    async fetchUser() {
      this.user = await this.$api.users.userGet({
        id: this.userId
      });
    },
    async fetchComments() {
      this.comments = await this.$api.comments.commentsGet({
        postId: this.postId
      })
    }
  }
}
</script>
