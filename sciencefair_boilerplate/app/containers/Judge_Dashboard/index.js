/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter , Redirect } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import Button from '../../components/Button';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Wrapper from './Wrapper';
import Section from './Section';
import messages from './messages';
import ProjectsList from './ProjectsList/ProjectList';
import { loadJudgeDashboard, loadJudgeResult  } from '../App/actions';
import { updateJudgeId,updateJudgeResult} from './actions';
import {makeSelectJudgeLoginStatus} from '../Judge_Login/selectors';
import { makeSelectUpdateJudge,makeSelectUpdateProjects} from './selectors';
import {LOCAL_DASHBOARD_STATE} from './constants';
import reducer from './reducer';
import saga from './saga';
import { Judge_Login } from '../Judge_Login';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

export class Judge_Dashboard extends React.PureComponent {
  constructor(props)
  {
    super(props);
    this.state = {
			error: null,
			projects: null,
      isLoading: false,
      id:0,
		};
    
  }
  

      componentDidMount()
        {
            console.log("in did mount");
            this._isMounted = true;
            this.setState({
              isLoading: true,
              error: null,
          
            });
            
            this.getProjects();
        }

        componentWillUnmount() {
          this._isMounted = false;
          console.log("inside wimmMpunt")
        }
        submitResults =  async (Id, judgeNumber, scores) => {
          // const { _id, judge_id_1, project_id } = this.props.project;
          const { judge_id,} = this.props;
          console.log("grt judgeid in submit", judge_id);
          // const judgeNumber = judge_id_1 === judge_id ? 1 : 2;
          console.log("back with _id and judgenumber in dashboard" , Id , judgeNumber);   
          console.log("back with results" , scores);
          const finalResult ={ 
                              _id: Id, 
                              judgeNumber: judgeNumber, 
                              scores : scores,
                              judge_id: judge_id,
                            }
          console.log("finalResult", finalResult);
          this.props.onUpdateJudgeResult(finalResult);
          this.props.onSubmitJudgeResult();
         
      
        };

        getProjects = () => { 
          const {loginresponse, projects} = this.props;
  
          if(loginresponse)
          {
         // console.log("in get proj", loginresponse);
          const { status , code,message, judgedetails} 
                                            = loginresponse;
         // console.log("code", judgedetails._id);
         this.props.onUpdateJudgeId(judgedetails._id);
         this.props.onSubmitJudgeDashboard();
         
          }
          //console.log("projects" , projects);
         
          
          return ;
         }
         componentWillReceiveProps()
         {
           console.log("in will recieve props")
          const {loginresponse, projects} = this.props;
          const{isLoading} = this.state;
          if(projects)
          {
            console.log("isLoading",isLoading);
            this.setState({isLoading: true});
          }
          else{
            this.setState({isLoading: false});
            console.log("isload", isLoading);
          }
         }
         

  render() 
  {
    var value;
    const {isLoading, error} = this.state;
    const {loginresponse , projects, classes , judge_id} = this.props;
    console.log("judgetails", loginresponse);
   const {status,code ,judgedetails}=loginresponse;
    console.log("projects in dashboard" , projects);
    console.log("judgeid in dashboard", judge_id);
    console.log("isloadin in render", isLoading);
    if(sessionStorage.getItem("loginresponse"))
                  {
                    console.log("heelo");
                     value = JSON.parse(sessionStorage.getItem("loginresponse"));
                    console.log("value in dashboard", value);
                  }
       // console.log("value out", value);
        //const {status,code ,judgedetails}=value;
                

    return (
      <article>
        
       <Button onClick ={ () => {window.location.replace("http://localhost:3000/judgelogin")}}>Logout</Button>
      <AtPrefix>
      <center><h1>hello, {judgedetails.name|| "judge"}</h1></center>
      <Wrapper>
      {!isLoading && (
						<CircularProgress
							disableShrink
							className=''
						/>
          )}
          {error && <p>Error</p>}
          {(isLoading|| error ) && projects && (
					<ProjectsList
            submitResults={this.submitResults}  
					/>
        )}
        </Wrapper>
        </AtPrefix>
      </article>
    );
  }
}



export function mapDispatchToProps(dispatch) {
  return {
    onSubmitJudgeDashboard: evt => {
      console.log("event value in login" , evt);
      if (evt !== undefined &&  evt.preventDefault) evt.preventDefault();
      dispatch(loadJudgeDashboard());
    },
    onSubmitJudgeResult: evt => {
      console.log("event value in login" , evt);
      if (evt !== undefined &&  evt.preventDefault) evt.preventDefault();
      dispatch(loadJudgeResult());
      },
    onUpdateJudgeId: judge_id => dispatch(updateJudgeId(judge_id )), 
    onUpdateJudgeResult: finalResult => dispatch(updateJudgeResult(finalResult)),

  };
}

const mapStateToProps = createStructuredSelector({
  loginresponse: makeSelectJudgeLoginStatus(),
  judge_id: makeSelectUpdateJudge(),
  projects: makeSelectUpdateProjects(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: LOCAL_DASHBOARD_STATE, reducer });
const withSaga = injectSaga({ key: LOCAL_DASHBOARD_STATE, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Judge_Dashboard);
