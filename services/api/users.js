export default axios => ({
  async usersGet({
                   sortBy = [],
                   sortDesc = [],
                   limit = null,
                   page = 1,
                   filters = {}
                 }) {
    const preparedFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value != null && value.toString().length > 0)
    )
    const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
      params: {
        _sort: sortBy.join(','),
        _order: sortDesc.map(isDesc => isDesc ? 'desc' : 'asc').join(','),
        _limit: limit,
        _start: (page - 1) * limit,
        ...preparedFilters
      }
    })
    return {users: response.data, totalUsers: +response.headers['x-total-count']}
  },
  async userGet({ id }) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data
  }
})
