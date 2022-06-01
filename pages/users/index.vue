<template lang="pug">
  .users-page
    v-data-table.users-page__table(:headers="headers" :items="users" :options.sync="options"
                                   :server-items-length="totalUsers" :loading="loading")
      template(v-slot:item.buttons="{ item }")
        v-btn(depressed color="primary" nuxt :to="`/users/${item.id}`")
          | Открыть
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
import debounce from 'lodash.debounce';
import startCase from 'lodash.startcase'

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
      options: {
        itemPerPage: 5,
        multiSort: true
      },
      filters: {
        id: null,
        name: null,
        username: null,
        email: null
      }
    }
  },
  computed: {
    loading() {
      return this.$fetchState.pending || this.isLoading
    },
    preparedFilters() {
      return {
        id: this.filters.id,
        name: startCase(this.filters.name),
        username: this.filters.username,
        email: this.filters.email
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.getUsers();
      },
      deep: true,
    },
    filters: {
      handler() {
        this.debouncedGetUsers();
      },
      deep: true,
    }
  },
  fetch() {
    this.getUsers();
  },
  created() {
    this.debouncedGetUsers = debounce(this.getUsers, 500);
  },
  beforeDestroy() {
    this.debouncedGetUsers.cancel();
  },
  methods: {
    async getUsers() {
      this.isLoading = true
      const {users, totalUsers} = await this.$api.users.usersGet({
        sortBy: this.options.sortBy,
        sortDesc: this.options.sortDesc,
        limit: this.options.itemsPerPage,
        page: this.options.page,
        filters: this.preparedFilters
      })
      this.users = users
      this.totalUsers = totalUsers
      this.isLoading = false
    }
  }
}
</script>
