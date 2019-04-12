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

import { UPDATE_CURRENT_STEP,UPDATE_TEACHER_DETAILS,UPDATE_STUDENT_DETAILS,
   UPDATE_REGISTER_RESPONSE ,UPDATE_FINAL_PROJECT_DETAILS , UPDATE_ERROR_IN_REGISTER} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

export function onChangeCurrentStep(currentStep)
{
  return{
    type: UPDATE_CURRENT_STEP,
    currentStep,
  };
}
export function onChangeTeacherDetails(teacherData)
{
  return{
    type: UPDATE_TEACHER_DETAILS,
    teacherData,
  };
}
export function onChangeStudentDetails(studentData)
{
  return{
    type: UPDATE_STUDENT_DETAILS,
    studentData,
  };
}
export function StudentRegisterResponse(registerResponse)
{
  return{
    type: UPDATE_REGISTER_RESPONSE,
    registerResponse, 
  }
}
export function onChangeFinalProjectDataList(dataList)
{
  return{
    type: UPDATE_FINAL_PROJECT_DETAILS,
    dataList,
  };
}
export function onChangeErrorinRegistration(errorStatus)
{
  return{
    type: UPDATE_ERROR_IN_REGISTER,
    errorStatus,
  }
}
