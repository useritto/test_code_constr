<template lang="pug">
  div.posts-page
    v-text-field.posts-page__search-text-field(
      v-model="searchQuery"
      label="Поиск"
      clearable
      append-outer-icon="mdi-magnify"
      outlined
    )

    v-row(dense v-if="posts")
      v-col.posts-page__post-list(cols='12')
        PostCard.mb-2(v-for="post in posts" :key="post.id" :post="post")

    .posts-page__pagination-wrapper.text-center
      v-pagination.posts-page__pagination(v-model="pagination.page" @input="search" :length="totalPages" :total-visible="7")
</template>

<script>
import debounce from 'lodash.debounce'

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
    '$route.query': function() {
      this.init();
      this.getPostsData();
    },
    searchQuery: {
      handler () {
        this.debouncedSearch()
      },
      deep: true
    }
  },
  fetch() {
    this.init();
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
    init() {
      this.searchQuery = this.$route.query.q || ''
      this.pagination = {
        page: +(this.$route.query.page || 1),
        limit: +(this.$route.query.limit || 10)
      }
    },
    search(page) {
      this.$router.replace({name: this.$route.name, query: {q: this.searchQuery, page: page}})
    }
  },
  created () {
    this.debouncedSearch = debounce(this.search, 500)
  },
  beforeUnmount () {
    this.debouncedSearch.cancel()
  }
}
</script>
