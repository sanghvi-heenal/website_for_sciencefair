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

import { JUDGE_REGISTER_DATA ,JUDGE_RESPONSE } from './constants';

// The initial state of the App
export const initialState = fromJS({
  data:{},
  response:{},
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case JUDGE_REGISTER_DATA:
    console.log("reducer", action.data);
    return state.set('data',action.data);
    case JUDGE_RESPONSE:
    return state.set('response',action.response);
    default:
      return state;
  }
}

export default homeReducer;
