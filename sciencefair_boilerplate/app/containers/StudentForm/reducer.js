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

import { CHANGE_USERNAME ,UPDATE_CURRENT_STEP,UPDATE_STUDENT_DETAILS,
  UPDATE_TEACHER_DETAILS , UPDATE_REGISTER_RESPONSE ,UPDATE_FINAL_PROJECT_DETAILS,
  UPDATE_ERROR_IN_REGISTER} from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  currentStep:0,
  teacherData:{},
  studentData:{},
  dataList:{},
  registerResponse:{},
  errorStatus:'',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state.set('username', action.name.replace(/@/gi, ''));
      case UPDATE_CURRENT_STEP:
      console.log("current in r" , action.currentStep);
      return state.set('currentStep', action.currentStep);
      case UPDATE_TEACHER_DETAILS:
      console.log("teach in r" , action.teacherData);
      return state.set('teacherData', action.teacherData);
      case UPDATE_STUDENT_DETAILS:
      console.log("s in r" , action.studentData);
      return state.set('studentData', action.studentData);
      case UPDATE_FINAL_PROJECT_DETAILS:
      console.log("Project reducer" , action.dataList);
      return state.set('dataList', action.dataList);
      case UPDATE_ERROR_IN_REGISTER:
      return state.set('errorStatus', action.errorStatus);
      case UPDATE_REGISTER_RESPONSE:
      return state.set('registerResponse', action.registerResponse);
    default:
      return state;
  }
}

export default homeReducer;
