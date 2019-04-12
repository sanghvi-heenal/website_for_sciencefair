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

import {  GET_JUDGE_DETAILS , UPDATE_JUDGEID , GET_PROJECT_DETAILS, UPDATE_JUDGE_RESULT } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */


// export function loadJudgeDashboard() {
//   return {
//     type: LOCAL_DASHBOARD_STATE,
//   };
// }
export function  getJudgeDetails(currentJudge)
{
  return {
  type: GET_JUDGE_DETAILS,
  currentJudge,
  }
}
export function  updateJudgeId(judge_id)
{
  sessionStorage.setItem("judge_id",JSON.stringify(judge_id))
  return{
  type: UPDATE_JUDGEID,
  judge_id,
  }
}
export function  getProjectDetails(projects)
{
  return{
  type: GET_PROJECT_DETAILS,
  projects,
  }
}
export function  updateJudgeResult(finalResult)
{
  return{
  type: UPDATE_JUDGE_RESULT,
  finalResult,
  }
}

