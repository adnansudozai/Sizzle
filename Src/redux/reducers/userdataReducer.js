import {
  USERDATA
} from '../types';
const initState = {
  userdata: [],
  isLogin:false,
  barerToken:''
};
const userdataReducer = (state = initState, action) => {

  switch (action.type) {
    case USERDATA:
      return {
        ...state,
        userdata: action.payload,
        isLogin:true,
        barerToken:action.barerToken
      };
    default:
      return state;
  }
};

export default userdataReducer;
