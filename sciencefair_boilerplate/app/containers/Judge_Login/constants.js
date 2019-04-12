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

export const CHANGE_JUDGE_LOGIN_EMAIL = 'boilerplate/judge_login/CHANGE_JUDGE_LOGIN_EMAIL';
export const CHANGE_JUDGE_LOGIN_PASSWORD = 'boilerplate/judge_login/CHANGE_JUDGE_LOGIN_PASSWORD';
export const JUDGE_LOGIN_STATUS = 'boilerplate/Judge/JUDGE_LOGIN_STATUS';
export const JUDGE_LOGIN_SUCCESS = 'boilerplate/Judge/JUDGE_LOGIN_SUCCESS';
export const LOCAL_JUDGE_LOGIN_STATE_NAME='judge_login';
//export const LOAD_JUDGE_PASSWORD_RESET = 'judge_password_reset';
export const JUDGE_PASSWORD_RESET = 'boilerplate/judge_login/JUDGE_PASSWORD_RESET';
export const JUDGE_PASSWORD_RESET_RESPONSE = 'boilerplate/judge_login/JUDGE_PASSWORD_RESET_RESPONSE';

