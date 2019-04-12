/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('judge_dashboard', initialState);

const makeSelectUpdateJudge = () =>
  createSelector(selectHome, homeState => homeState.get('judge_id'));
  const makeSelectUpdateProjects = () =>
  createSelector(selectHome, homeState => homeState.get('projects'));
  const makeSelectUpdateJudgeResult = () =>
  createSelector(selectHome, homeState => homeState.get('finalResult'));

export { selectHome,  makeSelectUpdateJudge , makeSelectUpdateProjects, makeSelectUpdateJudgeResult };
