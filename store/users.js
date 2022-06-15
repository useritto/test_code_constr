import Api from "/services/api";

const USERS_LIMIT = 500

export const state = () => ({
  users: []
})

export const getters = {
  users: state => state.users,
  filteredUsers: state => filters => {
    const preparedFilters = Object.entries(filters)
                              .filter(([key, value]) => value != null && value.toString().length > 0)
                              .map(([key, value]) => [key, value.toString().toUpperCase()])

    return state.users.filter(user =>
      preparedFilters
        .every(([filter, value]) =>
          user[filter] && user[filter].toString().toUpperCase().indexOf(value) !== -1)
    )
  }
}

export const mutations = {
  setUsers(state, users) {
    state.users = users
  }
}

export const actions = {
  async fetchUsers({ commit }) {
    const api = Api(this.$axios)
    const {users} = await api.users.usersGet({
      limit: USERS_LIMIT
    })
    commit('setUsers', users)
  }
}
