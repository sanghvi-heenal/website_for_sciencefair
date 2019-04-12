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

export const LOCAL_ADMIN='admin_cred';
export const CHANGE_ADMIN = 'boilerplate/admin_cred/CHANGE_ADMIN';
export const CHANGE_ADMIN_RESPONSE = 'boilerplate/admin_cred/CHANGE_ADMIN_RESPONSE';

export const LOCAL_JUDGE_DELETION= 'judge_deletion';
export const CHANGE_DELETE_JUDGE = 'boilerplate/judge_deletion/CHANGE_DELETE_JUDGE';
export const CHANGE_DELETE_JUDGE_RESPONSE = 
                        'boilerplate/judge_deletion/CHANGE_DELETE_JUDGE_RESPONSE';

export const LOCAL_STUDENT_DELETION= 'student_deletion';
export const CHANGE_DELETE_STUDENT = 'boilerplate/judge_deletion/CHANGE_DELETE_STUDENT';
export const CHANGE_DELETE_STUDENT_RESPONSE = 
                            'boilerplate/student_deletion/CHANGE_DELETE_STUDENT_RESPONSE';

export const LOCAL_GET_RANKS= 'get_ranks';
export const CHANGE_GET_RANKS = 'boilerplate/get_ranks/CHANGE_GET_RANKS';
export const CHANGE_GET_RANKS_RESPONSE = 'boilerplate/get_ranks/CHANGE_GET_RANKS_RESPONSE';