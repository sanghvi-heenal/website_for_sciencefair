/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_JUDGE_DASHBOARD, LOAD_JUDGE_RESULT} from 'containers/App/constants';
import {getProjectDetails } from './actions';

import request from 'utils/request';
import {makeSelectUpdateJudge,makeSelectUpdateJudgeResult} from './selectors';
import {makeSelectJudgeLoginStatus} from '../Judge_Login/selectors';


const ProjectDetails = "http://localhost:3000/api/judge/projects/";
const UpdateResult = "http://localhost:3000/api/project/score";


export function* getProjects() {

        try 
        {
        const judgeResponse = yield select(makeSelectJudgeLoginStatus());
        console.log("judgeDetails in dashboard saga", judgeResponse.judgedetails._id);
        const data={ judgeId:judgeResponse.judgedetails._id };
        console.log("before fetch",data);
        const response = yield axios
            .get(ProjectDetails, {
              params: {
                judgeId: judgeResponse.judgedetails._id,
              },
            })

            if(response.status==200)
            {
              const { data, status } = response;
              //console.log(" after fetch data" , data);
              console.log(" after fetch data" , data);
              yield put(getProjectDetails(data));
              
            }
          }
  
          catch (err) 
          {
            console.log("error" , err);
          }
}

//--------------------------------SAGA FUNCTION II-----------------------------------
export function* postResults() 
{
      try 
      {
          const judgeResult = yield select(makeSelectUpdateJudgeResult());
          console.log("judge Result in dashboard saga before fetch", judgeResult);
          let res = yield fetch(UpdateResult, {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;  charset=UTF-8',
              },        
            body: JSON.stringify(judgeResult),
          });
            let submit = yield res.json();
            console.log("saga response submit", submit);
            if(submit.code== 200)
            {
             console.log("submit", submit.projects);
             yield put(getProjectDetails(submit));


            }
            if(submit.code== 400)
            {
              console.log("scores are not submitted");
            }
       }
      catch (err) 
      {
        console.log("error" , err);
      }
}



/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {

  yield takeLatest(LOAD_JUDGE_DASHBOARD, getProjects);
  yield takeLatest(LOAD_JUDGE_RESULT, postResults);
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

}
