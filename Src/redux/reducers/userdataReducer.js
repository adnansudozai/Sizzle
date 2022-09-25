import {
  TOTALSCORE
} from '../types';
const initState = {
  totalScore: 0,
};
const userdataReducer = (state = initState, action) => {
  console.log('state of redux', state);
  switch (action.type) {
    case TOTALSCORE:
      return {
        ...state,
        totalScore: action.payload,
      };
    default:
      return state;
  }
};

export default userdataReducer;
