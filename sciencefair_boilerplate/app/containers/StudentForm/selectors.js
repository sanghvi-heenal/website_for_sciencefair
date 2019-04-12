/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('student_form', initialState);

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));
  const makeSelectUpdateCurrentStep = () =>
  createSelector(selectHome, homeState => homeState.get('currentStep'));
  const makeSelectUpdateTeacherDetails = () =>
  createSelector(selectHome, homeState => homeState.get('teacherData'));
  const makeSelectUpdateStudentDetails = () =>
  createSelector(selectHome, homeState => homeState.get('studentData'));
  const makeSelectUpdateFinalProjectDetails = () =>
  createSelector(selectHome, homeState => homeState.get('dataList'));
  const makeSelectUpdateErrorinRegistration = () =>
  createSelector(selectHome, homeState => homeState.get('errorStatus'));
  const makeSelectUpdateRegisterResponse = () =>
  createSelector(selectHome, homeState => homeState.get('registerResponse'));
export { selectHome, makeSelectUsername , makeSelectUpdateCurrentStep , 
                makeSelectUpdateTeacherDetails,makeSelectUpdateStudentDetails , 
                makeSelectUpdateRegisterResponse , makeSelectUpdateFinalProjectDetails,
                makeSelectUpdateErrorinRegistration};
