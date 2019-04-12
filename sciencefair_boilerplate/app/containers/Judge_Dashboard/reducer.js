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

import { GET_JUDGE_DETAILS , UPDATE_JUDGEID, GET_PROJECT_DETAILS,UPDATE_JUDGE_RESULT} from './constants';

// The initial state of the App
export const initialState = fromJS({
  currentJudge: {
                _id: 0,
                name: '', 
                login_email:'',
  },
  finalResult:{
    _id:0, 
    judgeNumber:0, 
    scores : {},
    judge_id: 0,
  },
  judge_id: 0,
  projects:[],
  
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_JUDGE_DETAILS:
      // Delete prefixed '@' from the github username
      return state.set('currentJudge', action.currentJudge);
      case UPDATE_JUDGEID:
      // Delete prefixed '@' from the github username
      console.log("reducer updated judgeid", action.judge_id)
      return state.set('judge_id', action.judge_id);
      case GET_PROJECT_DETAILS:
      console.log("project list",action.projects);
      return state.set('projects' , action.projects);
      case UPDATE_JUDGE_RESULT:
      console.log("final results in reducer",action.finalResult);
      return state.set('finalResult' , action.finalResult);
    default:
      return state;
  }
}

export default homeReducer;
