import HTTP from '.'

export default {
  createComment(id, comment) {
    return HTTP.post(`/comment/${id}`, comment)
  },
  fetchCommentsByOrderId(id){
    return HTTP.get(`/comment/all/${id}`)
  }
}
