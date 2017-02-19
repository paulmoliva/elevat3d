import initialState from './initialState';
import {
  RECEIVE_CURRENT_USER,
  LOGOUT
} from './constants';

export default function reducer(state = initialState, action) {
  let pollName;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.data.currentUser;
      let newState = Object.assign(state);
      newState.currentUser = currentUser;
      return newState;

    case LOGOUT:
      let newState1 = Object.assign(state);
      newState.currentUser = null;
      window.currentUser = null;
      return newState1;

    default:
      return state;
  }
}
