import {
  TOTALSCORE
} from '../types';

export const savePoints = data => {
  return {
    type: TOTALSCORE,
    payload: data,
  };
};
