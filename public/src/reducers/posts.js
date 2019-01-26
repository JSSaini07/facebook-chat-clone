export default (state=[], action) => {
  switch(action.type){
    case 'FETCH_ALL_POSTS': return action.payload.data.data;
    case 'CREATE_NEW_POST': var temp=state.map(d=>d); temp.push(action.payload.data.data); return temp.reverse();
    case 'CREATE_POST_VIA_SOCKET': var temp=state.map(d=>d); temp.push(action.payload); return temp.reverse();
    default: return state;
  }
}
