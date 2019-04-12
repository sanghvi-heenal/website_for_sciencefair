/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('judge_login', initialState);
const makeSelectJudgeLoginEmail = () =>
  createSelector(selectHome, homeState => homeState.get('judge_login_email'));
  const makeSelectJudgeLoginPassword = () =>
  createSelector(selectHome, homeState => homeState.get('judge_login_password'));
  const makeSelectJudgeLoginSuccess = () =>
  createSelector(selectHome, homeState => homeState.get('judgeDetails'));
  const makeSelectJudgeLoginStatus = () =>
  createSelector(selectHome, homeState => homeState.get('loginresponse'));
  
  const makeSelectJudgePasswordReset= () =>
  createSelector(selectHome, homeState => homeState.get('email'));
  const makeSelectJudgePasswordResetResponse= () =>
  createSelector(selectHome, homeState => homeState.get('resetresponse'));

export { selectHome, makeSelectJudgeLoginEmail ,makeSelectJudgeLoginPassword ,
        makeSelectJudgeLoginSuccess, makeSelectJudgeLoginStatus ,
         makeSelectJudgePasswordReset,makeSelectJudgePasswordResetResponse };
