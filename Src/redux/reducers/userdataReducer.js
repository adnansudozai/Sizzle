import {
  USERDATA,
  USERPIN
} from '../types';
const initState = {
  userdata: [],
  isLogin:false,
  barerToken:'',
  userpin:''
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
      case USERPIN:
        return {
          ...state,
          userpin: action.payload,
        
        };
    default:
      return state;
  }
};

export default userdataReducer;
