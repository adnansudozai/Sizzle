import {
  USERDATA
} from '../types';
const initState = {
  userdata: [],
  isLogin:false
};
const userdataReducer = (state = initState, action) => {

  switch (action.type) {
    case USERDATA:
      return {
        ...state,
        userdata: action.payload,
        isLogin:true
      };
    default:
      return state;
  }
};

export default userdataReducer;
