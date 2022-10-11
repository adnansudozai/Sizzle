import {
  USERDATA,
  USERPIN
} from '../types';

export const saveUserdata = (data,barerToken) => {
  console.log('barerToken',barerToken,'data',data);
  return {
    type: USERDATA,
    payload: data,
    barerToken:barerToken
  };
};

export const saveuserpin = (data) => {
  console.log('data',data);
  return {
    type: USERPIN,
    payload: data,

  };
};
