/*
 * App Actions
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

import { LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR , LOAD_JUDGE_LOGIN, 
              LOAD_JUDGE_DASHBOARD ,LOAD_JUDGE_RESULT, LOAD_JUDGE_REGISTRATION, 
              LOAD_JUDGE_PASSWORD_RESET, LOAD_STUDENT_FORM,
               LOAD_ADMIN, LOAD_JUDGE_DELETION,LOAD_STUDENT_DELETION , LOAD_RANKS} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}
export function loadStudentForm() {
  return {
    type: LOAD_STUDENT_FORM,
  };
}
export function loadJudgeRegistration() {
  return {
    type: LOAD_JUDGE_REGISTRATION,
  };
}
export function loadJudgeLogin() {
  return {
    type: LOAD_JUDGE_LOGIN,
  };
}
export function loadJudgeDashboard(){
  return {
    type: LOAD_JUDGE_DASHBOARD,
  };
}
export function loadJudgeResult(){
  return {
    type: LOAD_JUDGE_RESULT,
  };
}
export function loadJudgePasswordReset(){
  return {
    type: LOAD_JUDGE_PASSWORD_RESET,
  };
}
export function loadAdmin() {
  return {
    type: LOAD_ADMIN,
  };
}
export function loadJudgeDeletion() {
  return {
    type: LOAD_JUDGE_DELETION,
  };
}
export function loadStudentDeletion() {
  return {
    type: LOAD_STUDENT_DELETION,
  };
}
export function loadRanks() {
  return {
    type: LOAD_RANKS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
