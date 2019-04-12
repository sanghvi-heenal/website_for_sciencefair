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
import { Link, withRouter , Redirect } from 'react-router-dom';

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
import Input from '../../Judge_Registration/Input';
import Section from '../Section';
import messages from '../messages';
import { loadJudgePasswordReset } from '../../App/actions';
import { onChangePasswordReset } from '../actions';
import {makeSelectJudgePasswordResetResponse} from '../selectors';
import {LOCAL_JUDGE_LOGIN_STATE_NAME , LOAD_JUDGE_PASSWORD_RESET} from '../constants';
import reducer from '../reducer';
import saga from '../saga';


export class Password_Reset extends React.PureComponent {
  constructor(props)
  {
    super(props);
    this.state = {
            email:'',
            passwordStatus:'',
            show:false,
            show_error:false,
            password:'',
            Newpassword:'',

    };
   
  }
      handleEmail = (e) =>
      {
        this.setState({email: e.target.value})
      } 

      handlePassword = (e) =>
      {
        this.setState({password: e.target.value})
      }

      handleNewPassword = (e) =>
      {
       const {password,Newpassword,show_error} = this.state;
       this.setState({Newpassword:e.target.value})
       //Newpassword = e.target.value;
      }
      

     handleReset = () =>
      {
        const {password,Newpassword,show_error,passwordStatus} = this.state;
        console.log("show error",show_error , password , Newpassword)
        if(password === Newpassword)
        {
          //this.setState({show_error:false})
          show_error=false;
          
          console.log("show error",show_error);
                if(!show_error)
                {
                  console.log(" password", Newpassword , password);
                // return (
                //   <Redirect to={{pathname: '/judgelogin'}} push/>
                  window.location.replace("http://localhost:3000/judgelogin");
                //); 
                }
                if(show_error==false)
                {
                  console.log("iam here")
                  this.setState({passwordStatus:"Passwords Doesnot Match " , show_error:true})
                  console.log("password Status on reset",passwordStatus);
                }
        }
        else{
         // console.log(" false passwords", password , Newpassword);
         this.setState({passwordStatus:"Passwords Doesnot Match " , show_error:true})
        }     
      

      }
      handleSubmit = (e) =>
      {
        console.log("email" ,this.state.email)
        this.setState({passwordStatus:''});
        this.props.onUpdateEmail(this.state.email);
        this.props.onSubmitResetPassword();

      }
  render() 
  {
    const {resetresponse} = this.props
   const {show,passwordStatus} = this.state;
   //console.log("reserresponse",resetresponse)
      if(resetresponse.code == 200)
      {
                  //console.log("start redirecting");
                  //this.setState({show: true , passwordStatus:''});
                  console.log("show now", show);
                  resetresponse.code == 404;
                  return (
                    <div>
                      <br/>
                      <h3>{this.state.passwordStatus}</h3> 
                      <b>Enter New Password:</b>
                      <input type="password"
                              placeholder="Enter New Password"
                              value={this.state.password}
                            onChange={this.handlePassword}
                            style={{border: '1px solid black'}}
                            required/>
                            <br/><br/>
                      <b>Re-enter Password:</b>
                      <input type="password"
                        placeholder="Re-type Password"
                        value={this.state.Newpassword}
                      onChange={this.handleNewPassword}
                      style={{border: '1px solid black'}}
                      required/>
                    
                      <br/><br/>
                      
                      <input type="submit"
                            name="Save"
                            value="Reset"
                            onClick={this.handleReset}
                            style={{border: '1px solid black'}}
                            />
                          {this.setState({show:false})}

                    </div>
                  );
      }
      if(resetresponse.code == 404){
        console.log("not valid")
        this.setState({show: false });
        console.log("show now", show);
        this.setState({passwordStatus:"Judge Not Found"})
        console.log("paswordstatus", this.state.passwordStatus);
      }
      

    return (
      <article>
          <AtPrefix>
          {/* <form > */}
            <br/>
            <b>Enter Email Address:</b>
                <input type="email"
                        value={this.state.email}
                      onChange={this.handleEmail}
                      style={{border: '1px solid black'}}
                      required/>
                      <br/><br/>
                <input type="submit"
                      name="Enter"
                      value="Submit"
                      onClick={this.handleSubmit}
                      style={{border: '1px solid black'}}
                      /> 
                      <h3>{passwordStatus}</h3>
                      {/* </form> */}
              
          </AtPrefix>
      </article>
    );
  }
}



export function mapDispatchToProps(dispatch) {
  return {
    onSubmitResetPassword: evt => {
      if (evt !== undefined &&  evt.preventDefault) evt.preventDefault();
      dispatch(loadJudgePasswordReset());
    },
    onUpdateEmail : email => 
    {
      console.log("email in dispatch", email)
      dispatch(onChangePasswordReset(email))
    } ,
  };
}

const mapStateToProps = createStructuredSelector({
resetresponse: makeSelectJudgePasswordResetResponse(),
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
)(Password_Reset);
