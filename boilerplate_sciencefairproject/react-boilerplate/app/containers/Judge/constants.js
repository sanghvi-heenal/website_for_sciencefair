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

export const CHANGE_USERNAME = 'boilerplate/Judge/CHANGE_USERNAME';
export const CHANGE_NAME = 'boilerplate/Judge/CHANGE_USERNAME';
export const CHANGE_EMAIL = 'boilerplate/Judge/CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'boilerplate/Judge/CHANGE_PASSWORD';

export const LOCAL_STATE_NAME='Judge';
