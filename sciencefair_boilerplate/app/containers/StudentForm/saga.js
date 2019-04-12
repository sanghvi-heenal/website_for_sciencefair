/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_STUDENT_FORM } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import {makeSelectUpdateTeacherDetails,makeSelectUpdateStudentDetails, 
  makeSelectUpdateRegisterFlag,makeSelectUpdateFinalProjectDetails} from './selectors';
import {StudentRegisterResponse} from './actions';
/**
 * Github repos request/response handler
 */
const StudentRegister = "http://localhost:3000/api/users/register";
export function* getData() {

  try {
      const FinalData = yield select(makeSelectUpdateFinalProjectDetails());
      console.log("data in student saga" ,FinalData ); 
      // var
      //  Flag = yield select(makeSelectUpdateRegisterFlag());
      // console.log("flag",Flag);
      // if(Flag ==true)
      
        console.log("inside fetch")
        let res = yield fetch(StudentRegister, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },        
          body: JSON.stringify(FinalData),
        });
       // Flag = false;
        let submit = yield res.json();
       console.log("saga response register", submit);
       yield put(StudentRegisterResponse(submit));

      
      console.log("iam going out")
  } catch (err) {

    console.log("error" , err);
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
  yield takeLatest(LOAD_STUDENT_FORM, getData);
}
