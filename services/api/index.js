import Posts from './posts'
import Users from './users'
import Comments from './comments'

export default function (axios) {
  return {
    posts: Posts(axios),
    users: Users(axios),
    comments: Comments(axios),
  }
}
