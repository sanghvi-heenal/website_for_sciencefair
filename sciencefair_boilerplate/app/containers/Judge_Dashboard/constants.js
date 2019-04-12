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

export const GET_JUDGE_DETAILS = 'boilerplate/judge_dashboard/GET_JUDGE_DETAILS';
export const UPDATE_JUDGEID = 'boilerplate/judge_dashboard/UPDATE_JUDGEID';
export const GET_PROJECT_DETAILS = 'boilerplate/judge_dashboard/GET_PROJECT_DETAILS';
export const UPDATE_JUDGE_RESULT = 'boilerplate/judge_dashboard/UPDATE_JUDGE_RESULT';
export const LOCAL_DASHBOARD_STATE='judge_dashboard';

