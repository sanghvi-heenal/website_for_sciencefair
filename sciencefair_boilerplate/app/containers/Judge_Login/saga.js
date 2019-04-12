/**
 * Gets the repositories of the user from Github
 */

import { all ,fork ,call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOAD_JUDGE_LOGIN ,  LOAD_JUDGE_PASSWORD_RESET } from 'containers/App/constants';

import request from 'utils/request';
import {  makeSelectJudgeLoginEmail ,makeSelectJudgeLoginPassword,makeSelectJudgePasswordReset } from 'containers/Judge_login/selectors';
import { judgeLoginStatus , judgeLoginSuccess, onResetResponseAction} from './actions';
import { Password_Reset } from './Password_Reset';


/**
 * Github repos request/loginresponse handler
 */
const postJudgeLogin = "http://localhost:3000/api/judge/login";
const postPasswordReset = "http://localhost:3000/api/judge/judgeforgot"

const currentJudgeData =(Response) =>
{
  console.log("response", Response);
  return Response;
}
 function* getJudgeLoginInfo() {
  // Select username from store
  try{
    const judge_login_email = yield select(makeSelectJudgeLoginEmail());
    const judge_login_password = yield select(makeSelectJudgeLoginPassword());
    const data={ login_email : judge_login_email , login_password : judge_login_password};
    console.log("before fetch",data);
      let res = yield fetch(postJudgeLogin, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          },        
        body: JSON.stringify(data),
      });
      let loginresponse = yield res.json();
        console.log("loginresponse", loginresponse);
    console.log("status" , loginresponse.code);
        if(loginresponse.code== 200)
        {
        console.log("after fetch" ,loginresponse.judgedetails);
        currentJudgeData(loginresponse.JudgeDetails);
        yield put(judgeLoginStatus(loginresponse));
      //  yield put(judgeLoginSuccess(loginresponse.judgedetails ));
        }
        if(loginresponse.code==404)
        {
         yield put(judgeLoginStatus(loginresponse));
        }
    }
    catch(error){
      console.log("error occured", error);
    }
}

//-------------------------------SAGA FUNCTION II---------------------------------------------------------

function* getJudgeEmailInfo() {
  try{

    const email = yield select(makeSelectJudgePasswordReset());
    const data= { login_email : email};
    let res = yield fetch(postPasswordReset, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },        
      body: JSON.stringify(data),
    });
    var judgeFound = yield res.json();
    console.log("judge found" , judgeFound);
    if(judgeFound)
    {
      console.log("judge found" , judgeFound);
      yield put(onResetResponseAction(judgeFound))
      //yield put( ResetResponse(status));
    }

  }
  catch(error){
      console.log(error);
  }
}


/**
 * Root saga manages watcher lifecycle
 */


export default function* githubData()
{
  yield takeLatest(LOAD_JUDGE_LOGIN, getJudgeLoginInfo);
  yield takeLatest(LOAD_JUDGE_PASSWORD_RESET, getJudgeEmailInfo);

}

