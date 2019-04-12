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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, withRouter , Redirect } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from '../Judge_Registration/Input';
import Section from './Section';
import messages from './messages';
//import  Judge_Dashboard from '../Judge_Dashboard';
import Judge_Dashboard from '../Judge_Dashboard/index';
import { loadJudgeLogin } from '../App/actions';
import { changeJudgeLoginEmail , changeJudgeLoginPassword } from './actions';
import { makeSelectJudgeLoginStatus } from './selectors';
import {LOCAL_JUDGE_LOGIN_STATE_NAME} from './constants';
import reducer from './reducer';
import saga from './saga';
import { runInThisContext } from 'vm';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';


/* eslint-disable react/prefer-stateless-function */
export class Judge_Login extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        judge:'',
        login_email:'',
       login_password :'',
        show:false,
        show_error:false,
        loginStatus:'',
        message:'',

       };
       this.handleChangeEmail= this.handleChangeEmail.bind(this);
       this.handleChangePassword= this.handleChangePassword.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);        
       }


    handleChangeEmail(event) {
      this.setState({ login_email: event.target.value});

    }

    handleChangePassword(event) {
      this.setState({ login_password: event.target.value});
    }

     handleSubmit(event) {
           console.log('Handle Login called:', this.state);
          event.preventDefault();
          const { login_email, login_password } = this.state;
          const { handleLogin } = this.props;
          this.setState({loginStatus:''})
        this.props.onUpdateJudgeLoginEmail(login_email);
          this.props.onUpdateJudgeLoginPassword(login_password);
          this.props.onSubmitJudgeLoginForm();
         

    }
   
    render() {
      const { login_email, login_password,judge, show} = this.state;
      const{ judgeDetails , loginresponse} = this.props
      // if(loginresponse)
      // {
        
      //   else{
      //     //var value = this.props.loginresponse.toJS();
      //     var value = loginresponse;
      //     console.log("vvalues in else", value);
      //   }
      // }
      if(loginresponse.code== 200)
                {
                  if(sessionStorage.getItem("loginresponse"))
                  {
                    console.log("heelo");
                    var value = JSON.parse(sessionStorage.getItem("loginresponse"));
                    //console.log("value", value);
                  }
                  else{
                    //var value = this.props.loginresponse.toJS();
                    var value = loginresponse;
                    console.log("vvalues in else", value);
                  }
                  console.log("start redirecting");
                  this.setState({show: true });
                  console.log("show now", show);
                  loginresponse.code == 404;
                //return( <Redirect to ="/judge_dashboard"/>);
                }
               if(loginresponse.code==404)
               {
                  console.log("not valid")
                  this.setState({show: false });
                  console.log("show now", show);
                  this.setState({loginStatus:'Invalid login Credentials'});
                }
               

      
      return (
        <React.Fragment>
          <AtPrefix>
      {show&&<Judge_Dashboard/>}
      {!show&& (  
					  <div>
              
							<Form onSubmit={this.handleSubmit}>
							<CenteredSection><H2>Judge Login</H2></CenteredSection>
								
											<label>Email:</label>
                      
											<Input
                        type="email"
                        value={login_email}
												onChange={this.handleChangeEmail}
                        />
								
                      <br/>
											<label>Password:</label>
                      
											<Input
                        type="password"
                        name="login_password"
                        value={login_password}
												onChange={this.handleChangePassword }
                        	/>
                        
                      <br/>
                      <Button color="danger" style={{border: '1px solid black'}}>Login</Button> 
                    
                   
                      <Link to="/"> <Button color="danger" style={{border: '1px solid black'}}>Cancel</Button>	</Link>
                          <h3>{this.state.loginStatus}</h3>
											<Link
												to="/judgeregistration">	Judge Registrations	</Link>
											<br />
											<Link
												to="/password_reset"	>	Forgot Password ??	</Link>
                        <br/>
							</Form>
                    
					</div>
        )} 
        </AtPrefix>
			</React.Fragment>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitJudgeLoginForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadJudgeLogin());
    },
    onUpdateJudgeLoginEmail: judge_login_email => dispatch(changeJudgeLoginEmail(judge_login_email )),
    onUpdateJudgeLoginPassword: judge_login_password => dispatch(changeJudgeLoginPassword(judge_login_password)),
  };
   
}

const mapStateToProps = createStructuredSelector({
 loginresponse: makeSelectJudgeLoginStatus(),
 
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: LOCAL_JUDGE_LOGIN_STATE_NAME, reducer });
const withSaga = injectSaga({ key: LOCAL_JUDGE_LOGIN_STATE_NAME, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  
 
)(Judge_Login);
