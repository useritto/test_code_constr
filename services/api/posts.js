export default axios => ({
  async postsGet({
                   page = 1,
                   limit = null,
                   query = null
                 }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: limit,
        _page: page,
        q: query && query.length > 0 ? query : null
      }
    })
    return {posts: response.data, totalPosts: +response.headers['x-total-count']}
  },
  async postGet({id}) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return response.data
  }
})
