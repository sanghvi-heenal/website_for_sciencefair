/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('admin_cred', initialState);
const selectHome2 = state => state.get('judge_deletion', initialState);
const selectHome3 = state => state.get('student_deletion', initialState);
const selectHome4 = state => state.get('get_ranks', initialState);

const makeSelectAdmin = () =>
  createSelector(selectHome, homeState => homeState.get('admin'));
  const makeSelectAdminResponse = () =>
  createSelector(selectHome, homeState => homeState.get('adminresponse'));

  const makeSelectJudgeDeletion = () =>
  createSelector(selectHome2, homeState => homeState.get('deleteJudge'));
  const makeSelectJudgeDeletionResponse = () =>
  createSelector(selectHome2, homeState => homeState.get('judgedelresponse'));

  const makeSelectStudentDeletion = () =>
  createSelector(selectHome3, homeState => homeState.get('deleteStudent'));
  const makeSelectStudentDeletionResponse = () =>
  createSelector(selectHome3, homeState => homeState.get('studentdelresponse'));
  
  const makeSelectGetRank = () =>
  createSelector(selectHome4, homeState => homeState.get('getRank'));
  const makeSelectGetRankResponse = () =>
  createSelector(selectHome4, homeState => homeState.get('getRankresponse'));



export { selectHome,selectHome2,selectHome3,selectHome4, makeSelectAdmin,makeSelectAdminResponse 
  , makeSelectJudgeDeletion,makeSelectJudgeDeletionResponse,
    makeSelectStudentDeletion,makeSelectStudentDeletionResponse,
    makeSelectGetRank,makeSelectGetRankResponse} ;
