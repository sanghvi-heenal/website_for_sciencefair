/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { CHANGE_JUDGE_LOGIN_EMAIL ,CHANGE_JUDGE_LOGIN_PASSWORD ,
      JUDGE_LOGIN_SUCCESS ,JUDGE_LOGIN_STATUS, JUDGE_PASSWORD_RESET,JUDGE_PASSWORD_RESET_RESPONSE} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeJudgeLoginEmail(judge_login_email) {
  return {
    type: CHANGE_JUDGE_LOGIN_EMAIL,
    judge_login_email,
  };
}
export function changeJudgeLoginPassword(judge_login_password) {
  return {
    type: CHANGE_JUDGE_LOGIN_PASSWORD,
    judge_login_password,
  };
}
export function judgeLoginSuccess(judgeDetails) {
  return {
    type: JUDGE_LOGIN_SUCCESS,
    judgeDetails,
  };
}
export function judgeLoginStatus(loginresponse) {
  sessionStorage.setItem("loginresponse",JSON.stringify(loginresponse))
  return {
    type: JUDGE_LOGIN_STATUS,
    loginresponse,
  };
}


export function onChangePasswordReset(email) {
  return {
    type: JUDGE_PASSWORD_RESET,
    email,
  };
}
export function onResetResponseAction(resetresponse)
{
  return {
    type: JUDGE_PASSWORD_RESET_RESPONSE,
    resetresponse,
  };
}