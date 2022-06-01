export default axios => ({
  async commentsGet({ postId }) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return response.data
  }
})

