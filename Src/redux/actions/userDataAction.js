import {
  USERDATA
} from '../types';

export const saveUserdata = (data,barerToken) => {
  console.log('barerToken',barerToken,'data',data);
  return {
    type: USERDATA,
    payload: data,
    barerToken:barerToken
  };
};
