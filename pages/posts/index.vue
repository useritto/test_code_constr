<template lang="pug">
  div.posts-page
    form(@submit="onSubmit")
      v-text-field.posts-page__search-text-field(
        v-model="searchQuery"
        label="Поиск по заголовкам"
        clearable
        append-outer-icon="mdi-magnify"
        @click:append-outer="getPostsData"
        outlined
      )

    v-row(dense v-if="posts")
      v-col.posts-page__post-list(cols='12')
        PostCard.mb-2(v-for="post in posts" :key="post.id" :post="post")

    .posts-page__pagination-wrapper.text-center
      v-pagination.posts-page__pagination(v-model="pagination.page" :length="totalPages" :total-visible="7")
</template>

<script>
export default {
  name: 'PostsIndexPage',
  data: () => ({
    title: '',
    posts: [],
    totalPosts: null,
    pagination: {
      page: 1,
      limit: 10
    },
    searchQuery: ''
  }),
  computed: {
    totalPages() {
      return Math.ceil(this.totalPosts / this.pagination.limit)
    },
    loading() {
      return this.$fetchState.pending || this.isLoading
    }
  },
  watch: {
    pagination: {
      handler() {
        this.getPostsData();
      },
      deep: true,
    }
  },
  fetch() {
    this.getPostsData();
  },
  methods: {
    async getPostsData() {
      this.isLoading = true;
      const {posts, totalPosts} = await this.$api.posts.postsGet({
        limit: this.pagination.limit,
        page: this.pagination.page,
        query: this.searchQuery
      });
      this.posts = posts;
      this.totalPosts = totalPosts;
      this.isLoading = false
    },
    onSubmit(event) {
      event.preventDefault()
      this.getPostsData()
    }
  }
}
</script>
