/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_ADMIN,LOAD_JUDGE_DELETION,LOAD_STUDENT_DELETION,LOAD_RANKS} from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import {onChangeAdminResponse,onChangeJudgeDeleteResponse 
      , onchangeDeleteStudentResonse,onChangegetRankResponse} from './actions';

import request from 'utils/request';
import { makeSelectAdmin,makeSelectJudgeDeletion,
        makeSelectStudentDeletion, makeSelectGetRank} from './selectors';

/**
 * Github repos request/response handler
 */
const postadmin= "http://localhost:3000/api/admin/login";
const postJudgeDelete = "http://localhost:3000/api/admin/deletejudge";
const postStudentDelete = "http://localhost:3000/api/admin/deletestudent";
const getStudentRank =  "http://localhost:3000/api/admin/getranks";
export function* getRepos() {
  // Select username from store
  try {
        const admin = yield select(makeSelectAdmin());
        console.log("admin in saga",admin);
        let res = yield fetch(postadmin, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },        
          body: JSON.stringify(admin),
        });
        let adminresponse = yield res.json();
        console.log("loginresponse", adminresponse);
        yield put(onChangeAdminResponse(adminresponse));

 
  } catch (err) {
    console.log("error",err);
  }
}
//############################ SAGA2###############################################

export function* postStudentDeletion() {
  // Select username from store
  try {
        const studentDelete = yield select(makeSelectStudentDeletion());
        console.log("student in saga",studentDelete);
        let res = yield fetch(postStudentDelete, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },        
          body: JSON.stringify(studentDelete),
        });
        let studentdelresponse = yield res.json();
        console.log("studentresponse", studentdelresponse);
        yield put(onchangeDeleteStudentResonse(studentdelresponse));

 
  } catch (err) {
    console.log("error",err);
  }
}


//############################# SAGA 3#######################################

export function* postJudgeDeletion() {
  // Select username from store
  try {
        const judgeDelete = yield select(makeSelectStudentDeletion());
        console.log("judge in saga",judgeDelete);
        let res = yield fetch(postJudgeDeletion, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },        
          body: JSON.stringify(judgeDelete),
        });
        let judgedelresponse = yield res.json();
        console.log("loginresponse", judgedelresponse);
        yield put(onChangeJudgeDeleteResponse(judgedelresponse));

 
  } catch (err) {
    console.log("error",err);
  }
}
//############################### SAGA 4 #####################################################
export function* getRanks() {
  // Select username from store
  try {
        const getRank = yield select(makeSelectGetRank());
        console.log("getRank in saga",getRank.s_class , getRank.category);
        const getRankresponse =  yield axios.get( getStudentRank, {
          params: {
            s_class: getRank.s_class,
            category: getRank.category,
          },
        })
        //let getRankresponse = yield res.json();
        const { data,status} = getRankresponse;
        yield put(onChangegetRankResponse(getRankresponse.data.rankList));

 
  } catch (err) {
    console.log("error",err);
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* githubjudgeDelete() {
  yield takeLatest(LOAD_ADMIN, getRepos);
  yield takeLatest(LOAD_JUDGE_DELETION, postJudgeDeletion);
  yield takeLatest(LOAD_STUDENT_DELETION,postStudentDeletion);
  yield takeLatest(LOAD_RANKS, getRanks);
}
