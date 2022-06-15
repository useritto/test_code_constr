<template lang="pug">
  .users-page
    v-data-table.users-page__table(:headers="headers" :items="users" :options.sync="options"
      :loading="loading" @update:options="applyFilters")
      template(v-slot:item.buttons="{ item }")
        v-btn(depressed color="primary" nuxt :to="`/users/${item.id}`") Открыть
      template(v-slot:top)
        table
          tbody
            tr
              td
                v-text-field.mx-4(v-model="filters.id" label="Id")
              td
                v-text-field.mx-4(v-model="filters.name" label="Имя")
              td
                v-text-field.mx-4(v-model="filters.username" label="Никнейм")
              td
                v-text-field.mx-4(v-model="filters.email" label="E-mail")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import debounce from 'lodash.debounce'

export default {
  name: 'UsersIndexPage',
  data() {
    return {
      isLoading: false,
      headers: [
        {text: 'Id пользователя', align: 'start', value: 'id'},
        {text: 'Имя', value: 'name'},
        {text: 'Никнейм', value: 'username'},
        {text: 'E-mail', value: 'email'},
        {text: 'Переход', value: 'buttons'}
      ],
      options: {},
      filters: {
        id: '',
        name: '',
        username: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapGetters('users', ['filteredUsers']),
    loading() {
      return this.$fetchState.pending || this.isLoading
    },
    users() {
      return this.filteredUsers(this.filters)
    }
  },
  watch: {
    '$route.query': function() {
      this.init();
      this.getUsers();
    },
    filters: {
      handler () {
        this.debouncedApplyFilters(this.options, true)
      },
      deep: true
    }
  },
  fetch() {
    this.init();
    this.getUsers();
  },
  methods: {
    ...mapActions('users', ['fetchUsers']),
    async getUsers() {
      this.isLoading = true
      await this.fetchUsers()
      this.isLoading = false
    },
    init() {
      this.options = {
        page: +(this.$route.query.page || 1),
        itemsPerPage: +(this.$route.query.itemsPerPage || 5),
        sortBy: [this.$route.query.sortBy || []].flat(),
        sortDesc: [this.$route.query.sortDesc || []].flat(),
        groupBy: [this.$route.query.groupBy || []].flat(),
        groupDesc: [this.$route.query.groupDesc || []].flat(),
        multiSort: true,
        mustSort: this.$route.query.mustSort || false
      }
      this.$set(this.filters, 'id', this.$route.query.id || '')
      this.$set(this.filters, 'name', this.$route.query.name || '')
      this.$set(this.filters, 'username', this.$route.query.username || '')
      this.$set(this.filters, 'email', this.$route.query.email || '')
    },
    applyFilters(options, resetPage = false) {
      this.$router.replace({name: this.$route.name, query: {
        ...this.filters, ...options, page: resetPage ? '1' : options.page
      }})
    }
  },
  created () {
    this.debouncedApplyFilters = debounce(this.applyFilters, 500)
  },
  beforeUnmount() {
    this.debouncedApplyFilters.cancel()
  }
}
</script>
