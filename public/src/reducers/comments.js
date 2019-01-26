export default (state={}, action) => {
  switch(action.type){
    case 'FETCH_ALL_COMMENTS': let temp = {}; Object.keys(state).map(key=>temp[key]=state[key]); temp[action.payload.data.post_id]=action.payload.data.data; return temp;
    case 'SAVE_COMMENT': let save_temp={}; Object.keys(state).map(key=>save_temp[key]=state[key]); save_temp[action.payload.data.post_id]=[action.payload.data.data].concat(state[action.payload.data.post_id]); return save_temp;
    case 'SAVE_SUB_COMMENT': let sub_temp={}; Object.keys(state).map(key=>sub_temp[key]=state[key]); sub_temp[action.payload.data.post_id]=sub_temp[action.payload.data.post_id].map(d=>{if(d._id==action.payload.data.data._id){return action.payload.data.data;}else{return d;}}); return sub_temp;
    case 'SAVE_COMMENT_VIA_SOCKET': let save_temp_socket={}; Object.keys(state).map(key=>save_temp_socket[key]=state[key]); save_temp_socket[action.post_id]=[action.data].concat(state[action.post_id]); return save_temp_socket;
    case 'SAVE_SUB_COMMENT_VIA_SOCKET': let sub_temp_socket={}; Object.keys(state).map(key=>sub_temp_socket[key]=state[key]); sub_temp_socket[action.post_id]=sub_temp_socket[action.post_id].map(d=>{if(d._id==action.data._id){return action.data;}else{return d;}}); return sub_temp_socket;
    default: return state;
  }
}
