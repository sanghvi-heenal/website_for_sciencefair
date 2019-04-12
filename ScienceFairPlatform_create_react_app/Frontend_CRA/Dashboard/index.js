/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
//import H2 from 'components/H2';
//import ReposList from 'components/ReposList';
import AtPrefix from '../AtPrefix';
import CenteredSection from '../CenteredSection';
import Form from '../Form';
import Input from '../Input';
import Section from '../Section';
import messages from '../messages';
import { loadJudgeLogin } from '../../App/actions';
import { changeUsername } from '../actions';
import { makeSelectJudgeLoginSuccess} from '../selectors';
import {LOCAL_JUDGE_LOGIN_STATE_NAME} from '../constants';
import reducer from '../reducer';
import saga from '../saga';


export class Dashboard extends React.PureComponent {
  constructor(props)
  {
    super(props);
    this.state = {
			error: null,
			projects: null,
			isLoading: false,
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
            
            //this.getProjects();
        }
        // getProjects = () => { 
        //  const judgeDetails1 = this.props.judgeDetails;
        //  console.log("juddetails", judgeDetails1);
        //   return ;
        //  }
        componentWillMount(){
          const { judgeDetails} = this.props;
          if(judgeDetails._id != 0)
          {
            console.log("judge", judgeDetails);
          }
          else
          {
            console.log("nothing");
          }
        }

  render() 
  {
    console.log("juddetails in render", this.props.judgeDetails);

    return (
      <article>
     
      <h1>hello</h1>
      </article>
    );
  }
}



export function mapDispatchToProps(dispatch) {
  return {
    onSubmitJudgeDashboard: evt => {
      console.log("event value in login" , evt);
      if (evt !== undefined &&  evt.preventDefault) evt.preventDefault();
      dispatch(loadJudgeLogin());
    }
    
  };
}

const mapStateToProps = createStructuredSelector({
  //currentJudge: makeSelectCurrentJudge(),
  judgeDetails: makeSelectJudgeLoginSuccess(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'LOCAL_JUDGE_LOGIN_STATE_NAME', reducer });
const withSaga = injectSaga({ key: 'LOCAL_JUDGE_LOGIN_STATE_NAME', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
