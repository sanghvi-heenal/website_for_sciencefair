/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_ADMIN = 'boilerplate/App/LOAD_ADMIN';
export const LOAD_RANKS = 'boilerplate/App/LOAD_RANKS';
export const LOAD_STUDENT_FORM = 'boilerplate/App/LOAD_STUDENT_FORM';
export const LOAD_JUDGE_REGISTRATION = 'boilerplate/App/LOAD_JUDGE_REGISTRATION';
export const LOAD_JUDGE_LOGIN = 'boilerplate/App/LOAD_JUDGE_LOGIN';
export const LOAD_JUDGE_PASSWORD_RESET = 'boilerplate/App/LOAD_JUDGE_PASSWORD_RESET';
export const LOAD_JUDGE_DASHBOARD = 'boilerplate/App/LOAD_JUDGE_DASHBOARD';
export const LOAD_JUDGE_RESULT = 'boilerplate/App/LOAD_JUDGE_RESULT';
export const LOAD_JUDGE_DELETION = 'boilerplate/App/LOAD_JUDGE_DELETION';
export const LOAD_STUDENT_DELETION = 'boilerplate/App/LOAD_STUDENT_DELETION';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
