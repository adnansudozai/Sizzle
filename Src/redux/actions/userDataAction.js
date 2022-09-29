import {
  USERDATA
} from '../types';

export const saveUserdata = data => {
  return {
    type: USERDATA,
    payload: data,
  };
};
