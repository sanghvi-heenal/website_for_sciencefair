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

import { CHANGE_JUDGE_LOGIN_EMAIL ,CHANGE_JUDGE_LOGIN_PASSWORD,
       JUDGE_LOGIN_SUCCESS,JUDGE_LOGIN_STATUS, JUDGE_PASSWORD_RESET,JUDGE_PASSWORD_RESET_RESPONSE } from './constants';

// The initial state of the App
export const initialState = fromJS({
 judge_login_email: '',
 judge_login_password:'',
 judgeDetails: {_id: 0,
                name: '', 
                login_email:''},
 loginresponse:{status: false,
                code: '', 
                message: '',
              judgedetails:{}} ,
  email:'',
  resetresponse:{}

});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_JUDGE_LOGIN_EMAIL:
      console.log("reducer email", action.judge_login_email);
      // Delete prefixed '@' from the github username
      return state.set('judge_login_email', action.judge_login_email);
    case CHANGE_JUDGE_LOGIN_PASSWORD:
    return state.set('judge_login_password', action.judge_login_password);
    case JUDGE_LOGIN_SUCCESS:
    return state.set(' reducer judgeDetails' , action.judgeDetails);
    case JUDGE_LOGIN_STATUS:
    return state.set('loginresponse',action.loginresponse);
    case JUDGE_PASSWORD_RESET:
    return state.set('email' , action.email);
    case JUDGE_PASSWORD_RESET_RESPONSE:
    console.log("response in reducer", action.resetresponse);
    return state.set('resetresponse' , action.resetresponse);
    default:
      return state;
  }
}

export default homeReducer;
