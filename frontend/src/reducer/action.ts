import { Data } from '../@types/types';

export const setUser = (user: Data.User) => {
  return { type: 'SET_USER', payload: user };
};

export const setCodeBlockes = (CodeBlocks: Data.Codeblock[]) => {
  return { type: 'SET_CODE_BLOCKS', payload: CodeBlocks };
};
