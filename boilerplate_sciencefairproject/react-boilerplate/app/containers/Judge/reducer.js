/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { CHANGE_NAME , CHANGE_EMAIL, CHANGE_PASSWORD} from './constants';

// The initial state of the App
export const initialState = fromJS({
name: '',
email : '',
password: '',  
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      console.log("reducer name",action.name);
      return state.set('name', action.name);
      case CHANGE_EMAIL:
      return state.set('email', action.email);
      case CHANGE_PASSWORD:
      return state.set('password', action.password);
    default:
      return state;
  }
}

export default homeReducer;
