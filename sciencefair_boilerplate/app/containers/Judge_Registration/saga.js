/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_JUDGE_REGISTRATION } from 'containers/App/constants';
import request from 'utils/request';
import {changeJudgeResponse} from './actions';
import { makeSelectJudgeRegisterData } from './selectors';


/**
 * Github repos request/response handler
 */
const postJudgeRegister = "http://localhost:3000/api/judge_information/judgeregister";
export function* getRepos() {
  console.log("Inside Sagas ");
  try {
        const data = yield select(makeSelectJudgeRegisterData());
        console.log("data in saga", data);
        let res = yield fetch(postJudgeRegister, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },        
          body: JSON.stringify(data),
        });
        console.log(res.status);
        let response = yield res.json();
        console.log("after fetch" ,response);
      
      if(response.errors==null){
        if((response.code== 400 ) || (response.status = false ) )
        {
          console.log("response is " , response);
          
         yield put(changeJudgeResponse(response));
        }
        else
        {
          console.log("response is" , response);
          yield put(changeJudgeResponse(response));
        }
    } 
    else{
      console.log("error in backend" , response);
      res = {
        status: false, 
        code: 422, 
        message: "Invalid Email",
      };
     yield put(changeJudgeResponse(res));

    }
  }
  catch (err)
   {
    console.log("error occured" , err);
   }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_JUDGE_REGISTRATION, getRepos);
}
