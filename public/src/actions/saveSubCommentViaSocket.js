export default (data, post_id) => {
  return {
    type:'SAVE_SUB_COMMENT_VIA_SOCKET',
    data: data,
    post_id: post_id
  }
}
