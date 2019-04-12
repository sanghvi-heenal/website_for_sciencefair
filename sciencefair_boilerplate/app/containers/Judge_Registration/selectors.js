/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { LOCAL_JUDGE_STATE_NAME } from './constants';

const selectHome = state => state.get(LOCAL_JUDGE_STATE_NAME, initialState);

const makeSelectJudgeRegisterData = () =>
  createSelector(selectHome, homeState => homeState.get('data'));
  const makeSelectJudgeResponse = () =>
  createSelector(selectHome, homeState => homeState.get('response'));

export { selectHome, makeSelectJudgeRegisterData,makeSelectJudgeResponse };
