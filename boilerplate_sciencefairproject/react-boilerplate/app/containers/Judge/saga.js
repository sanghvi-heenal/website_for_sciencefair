/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectName, makeSelectEmail,makeSelectPassword   } from 'containers/Judge/selectors';


/**
 * Github repos request/response handler
 */
const postJudgeRegister = "http://localhost:3000/api/users/judgeregister";
export function*  getJudgeInfo() {
  console.log("Inside Sagas ");
  try{
        const name = yield select(makeSelectName());
        const email = yield select(makeSelectEmail());
        const password = yield select(makeSelectPassword());
        
        console.log(name);
        console.log(email);
        console.log(password);
        const data={name:name , login_email : email , password : password};
        console.log("before fetch",data);
          let res = yield fetch(postJudgeRegister, {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              },        
            body: JSON.stringify(data),
          });
        console.log(res.status);
        let res1 = yield res.json();
        console.log("after fetch" ,res1);
  }
  catch(error){
        console.log("error occured");
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
  yield takeLatest(LOAD_REPOS, getJudgeInfo);
}
