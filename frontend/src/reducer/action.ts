import { Data } from '../@types/types';

export const setUser = (user: Data.User) => {
  return { type: 'SET_USER', payload: user };
};
