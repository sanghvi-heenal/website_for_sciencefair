/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOCAL_STUDENT_FORM_STATE = 'student_form';

export const UPDATE_CURRENT_STEP = 'boilerplate/student_form/UPDATE_CURRENT_STEP';
export const UPDATE_TEACHER_DETAILS = 'boilerplate/student_form/UPDATE_TEACHER_DETAILS';
export const UPDATE_STUDENT_DETAILS = 'boilerplate/student_form/UPDATE_STUDENT_DETAILS';
export const UPDATE_FINAL_PROJECT_DETAILS = 'boilerplate/student_form/UPDATE_FINAL_PROJECT_DETAILS';
export const UPDATE_ERROR_IN_REGISTER = 'boilerplate/student_form/UPDATE_ERROR_IN_REGISTER';
export const UPDATE_REGISTER_RESPONSE = 'boilerplate/student_form/UPDATE_REGISTER_RESPONSE';