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

import { CHANGE_ADMIN ,CHANGE_ADMIN_RESPONSE ,
  CHANGE_DELETE_JUDGE,CHANGE_DELETE_JUDGE_RESPONSE,
  CHANGE_DELETE_STUDENT,CHANGE_DELETE_STUDENT_RESPONSE,
  CHANGE_GET_RANKS,CHANGE_GET_RANKS_RESPONSE} from './constants';

// The initial state of the App
export const initialState = fromJS({
  admin:'',
  adminresponse:{},
  deleteJudge : {},
  judgedelresponse:{},
  deleteStudent:{},
  studentdelresponse:{},
  getRank:{},
  getRankresponse:{},
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
      case CHANGE_ADMIN:
      return state.set('admin', action.admin);
      case CHANGE_ADMIN_RESPONSE:
      return state.set('adminresponse', action.adminresponse);
      case CHANGE_DELETE_JUDGE:
      return state.set('deleteJudge', action.deleteJudge);
      case CHANGE_DELETE_JUDGE_RESPONSE:
      return state.set('judgedelresponse', action.judgedelresponse);
      case CHANGE_DELETE_STUDENT:
      return state.set('deleteStudent', action.deleteStudent);
      case CHANGE_DELETE_STUDENT_RESPONSE:
      return state.set('studentdelresponse', action.studentdelresponse);
      case CHANGE_GET_RANKS:
      return state.set('getRank', action.getRank);
      case CHANGE_GET_RANKS_RESPONSE:
      return state.set('getRankresponse', action.getRankresponse);
    default:
      return state;
  }
}

export default homeReducer;
