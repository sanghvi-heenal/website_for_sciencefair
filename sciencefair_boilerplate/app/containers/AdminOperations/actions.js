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

import { CHANGE_ADMIN ,CHANGE_ADMIN_RESPONSE,
   CHANGE_DELETE_JUDGE,CHANGE_DELETE_JUDGE_RESPONSE,
  CHANGE_DELETE_STUDENT,CHANGE_DELETE_STUDENT_RESPONSE,
    CHANGE_GET_RANKS,CHANGE_GET_RANKS_RESPONSE} from './constants';
import { func } from 'prop-types';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function onChangeAdmin(admin) {
  return {
    type: CHANGE_ADMIN,
    admin,
  };
}
export function onChangeAdminResponse(adminresponse)
{
  return {
    type: CHANGE_ADMIN_RESPONSE,
    adminresponse,
  };
}
export function onChangeDeleteJudge(deleteJudge)
{
  return {
    type: CHANGE_DELETE_JUDGE,
    deleteJudge,
  };

}
export function onChangeJudgeDeleteResponse(judgedelresponse)
{
  return {
    type: CHANGE_DELETE_JUDGE_RESPONSE,
    judgedelresponse,
  };
}
export function changeDeleteStudent(deleteStudent)
{
  return {
    type: CHANGE_DELETE_STUDENT,
    deleteStudent,
  };
}

export function onchangeDeleteStudentResonse(studentdelresponse)
{
  return {
    type: CHANGE_DELETE_STUDENT_RESPONSE,
    studentdelresponse,
  };
}
export function onChangeGetRank(getRank)
{
  return {
    type: CHANGE_GET_RANKS,
    getRank,
  };
}
export function onChangegetRankResponse(getRankresponse)
{
  return {
    type: CHANGE_GET_RANKS_RESPONSE,
    getRankresponse,
  };
}

