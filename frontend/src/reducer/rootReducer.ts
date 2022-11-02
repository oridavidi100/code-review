import { Data } from '../@types/types';

const initialState: Data.InitialState = {
  user: {
    userName: '',
    admin: false,
  },
};

const rootreducer = (state = initialState, action: Data.Action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default rootreducer;
