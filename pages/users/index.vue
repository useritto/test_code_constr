<template lang="pug">
  .users-page
    v-data-table.users-page__table(:headers="headers" :items="users" :options.sync="options"
      :server-items-length="totalUsers" :loading="loading" @update:options="applyFilters")
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
              td
                v-btn(depressed color="primary" @click="() => applyFilters(options, true)") Применить
</template>

<script>
export default {
  name: 'UsersIndexPage',
  data() {
    return {
      isLoading: false,
      users: [],
      totalUsers: 0,
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
    loading() {
      return this.$fetchState.pending || this.isLoading
    }
  },
  watch: {
    '$route.query': function() {
      this.init();
      this.getUsers();
    }
  },
  fetch() {
    this.init();
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.isLoading = true
      const {users, totalUsers} = await this.$api.users.usersGet({
        sortBy: this.options.sortBy,
        sortDesc: this.options.sortDesc,
        limit: this.options.itemsPerPage,
        page: this.options.page,
        filters: this.filters
      })
      this.users = users
      this.totalUsers = totalUsers
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
      this.filters = {
        id: this.$route.query.id || '',
        name: this.$route.query.name || '',
        username: this.$route.query.username || '',
        email: this.$route.query.email || ''
      }
    },
    applyFilters(options, resetPage = false) {
      this.$router.push({name: this.$route.name, query: {
        ...this.filters, ...options, page: resetPage ? '1' : options.page
      }})
    }
  }
}
</script>
