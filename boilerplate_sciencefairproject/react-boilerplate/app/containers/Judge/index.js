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
//import {Control,Form, Errors,combineForms} from 'react-redux-form';
import {reduxForm,Field} from 'redux-form';

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
//import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeCurrentName , changeCurrentEmail , changeCurrentPassword } from './actions';
import { makeSelectUsername , makeSelectName, makeSelectEmail, makeSelectPassword } from './selectors';
import reducer from './reducer';
import saga from './saga';

import {LOCAL_STATE_NAME} from './constants';

/* eslint-disable react/prefer-stateless-function */
 class Judge extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */

   constructor(props){
     super(props);
    this.name = '';
    this.email='';
    this.password='';
    this.judgeName = React.createRef();
    this.judgeEmail = React.createRef();
    this.judgePassword = React.createRef();
    // this.emailValMsg='',
    // this.passwordValMsg='';
    this.finalInput='',
    this._validateOnDemand = true,
    this._validateData = this._validateData.bind(this);
    this._validationErrors=this._validationErrors.bind(this);
    this.handleUserInput=this.handleUserInput.bind(this);
  
   }

   handleUserInput=() => 
   {
        if(!this._validateOnDemand)
        return;

        console.log("inside handlueinput");
        this.email= this.judgeEmail.current.value;
        this.password = this.judgePassword.current.value;
        
        const userInput={email:this.email , 
                          password:this.password};

        const validateNewInput = this._validateData(userInput);
        this.finalInput = Object.assign(userInput,validateNewInput,
                                        this._validationErrors(validateNewInput)); }
        
        _validateData(data)
        {
        console.log("inside validatedata");
        return {
                emailVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.email), // required: regex w3c uses in html5
                passwordVal: (data.password != ''),
                }
        }
      _validationErrors(val)
        {
        console.log("inside validateErrors");
        const errMsgs = {
                        emailValMsg: val.emailVal ? '' : 'Email is required',
                        passwordValMsg: val.passwordVal? '' : 'Password is required',
                        }
        return errMsgs;
   } 
   
   
 
  
  
  
  judgeRegister = (e) =>
   {
     
     console.log("inside judge register");
    this.name = this.judgeName.current.value;
    this.email= this.judgeEmail.current.value;
    this.password = this.judgePassword.current.value;
    if(!this.name && !this.email && !this.password)
    {
      return
    }
    this.props.onUpdateName(this.name);
    this.props.onUpdateEmail(this.finalInput.email);
    this.props.onUpdatePassword(this.finalInput.password);
    this.props.onSubmitForm();
   }
 

  render() {
  
   
    return (
     <article>
       <AtPrefix>
       <b>Name:</b>
          <b> 
          <input type="text" 
                name="name"
                style={{border: '1px solid black'}} 
                /></b>
          <br/>
          <br/>
          <b>Email:</b>
          <b> 
          <input type="email" 
                    name="email"
                    onBlur={this.handleUserInput} 
                    style={{border: '1px solid black'}} /></b>

                    {/* {this.state.emailValMsg} */}
          <br/><br/>      
         <b>Password:</b>
          
          <input type="password" 
                  name="password" 
                  onBlur={this.handleUserInput} 
                  style={{border: '1px solid black'}} />
                  {/* {this.state.passwordValMsg}  */}
          
          <center><input type ='submit'
                        value='submit'
                        onClick={this.judgeRegister}
                        style={{border: '1px solid black'}}/></center>

        </AtPrefix>
     </article>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    // onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    onUpdateName: name => dispatch(changeCurrentName(name)),
    onUpdateEmail: email => dispatch(changeCurrentEmail(email)),
    onUpdatePassword: password => dispatch(changeCurrentPassword(password)),

  };
}

const mapStateToProps = createStructuredSelector({
  name: makeSelectName(),
  email : makeSelectEmail(),
  password: makeSelectPassword(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: LOCAL_STATE_NAME, reducer });
const withSaga = injectSaga({ key: LOCAL_STATE_NAME, saga });



export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Judge);
