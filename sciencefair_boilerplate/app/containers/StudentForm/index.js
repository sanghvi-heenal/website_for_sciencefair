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
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import RightSection from './RightSecrion';
import LeftSection from './LeftSection';
import Button from '../../components/Button';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import Teacher_Details from './Steps/Teacher_Details';
import Student_Details from './Steps/Student_Details';
import Display_Details from './Steps/Display_Details';
import { loadStudentForm } from '../App/actions';
import {onChangeCurrentStep, onChangeRegisterFlag, 
  onChangeFinalProjectDataList,onChangeErrorinRegistration } from './actions';
import { makeSelectUpdateRegisterResponse, makeSelectUpdateStudentDetails, makeSelectUpdateTeacherDetails } from './selectors';
import {LOCAL_STUDENT_FORM_STATE} from './constants';
import reducer from './reducer';
import saga from './saga';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';

/* eslint-disable react/prefer-stateless-function */
export class StudentForm extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */ constructor(props)
   {
     super(props)
     this.state =
     {
      currentStep: 1,
      dataList :'',
      errorStatus:'',
      show:false,
     }
     this.previousButton = this.previousButton.bind(this);
     this.nextButton = this.nextButton.bind(this);
    }
   _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }
  /*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <Button 
        className="btn btn-secondary" 
        type="button" onClick={this._prev} >
      Previous
      </Button>
    )
  }
  return null;
}

nextButton()
{
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <Button 
        className="btn btn-primary float-right" 
        type="button" 
        onClick={this._next
        } > Next
      </Button>        
    )
  }
  return null;
}

        callAction = () =>
        {
        this.props.onUpdatecurrentStep(this.state.currentStep);
        
        }

        handleRegister = (registerFlag) =>
        {
          console.log("register", registerFlag)
          if(registerFlag)
          {
            this.state.dataList = {
              ...this.props.teacherData ,
              ...this.props.studentData,
            }
            console.log("datalsit" , this.state.dataList);
          this.props.onUpdateFinalProjectDataList(this.state.dataList);
          this.props.onSubmitForm();
          }
          else{
            this.state.errorStatus="Registration Failed , Please Try Again"
            onUpdateErrorinRegistration(this.state.errorStatus);
          }
        }
        handleDataList = ( data)  =>
        {
          //const{dataList} = this.state;
        this.state.dataList = { ...this.state.dataList,
            ...data}
          console.log("dataList",this.state.dataList);
        }

       


  render() {
    const {registerResponse} = this.props;
    if(registerResponse.code==200)
    {
      this.setState({show: true});
    }
    if(registerResponse.code == 404)
    {
      this.setState({show: true});
      this.setState({errorStatus:'Registration Failed, Please Try Again'})
    }
    return (
      <article>
         
    <SweetAlert
	    
      show={this.state.show}
      title="Done"
      text="Student Registration Successful "
      onConfirm={() => {
        window.location.replace("http://localhost:3000/studentform");
          this.setState({ show : false });}} />
        <div>
        <br/>
        <h2>{this.state.errorStatus}</h2>
        {this.callAction()}
        <Teacher_Details />
        {console.log("below")}
        <Student_Details/>
        <Display_Details 
        handleRegister={this.handleRegister}/>
        <LeftSection>{this.previousButton()}</LeftSection><RightSection>{this.nextButton()}</RightSection>
        
        
        </div>
      </article>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadStudentForm());
    },
    onUpdatecurrentStep : currentStep =>  dispatch(onChangeCurrentStep(currentStep)),
    onUpdateFinalProjectDataList : dataList =>  dispatch(onChangeFinalProjectDataList(dataList)),
    onUpdateErrorinRegistration : errorStatus =>  dispatch(onChangeErrorinRegistration(errorStatus)),
    // onUpdateRegister : registerFlag =>
    // { 
    //   dispatch(onChangeRegisterFlag(registerFlag))
    // },
  };
}

const mapStateToProps = createStructuredSelector({
  registerResponse: makeSelectUpdateRegisterResponse(),
  studentData: makeSelectUpdateStudentDetails(),
  teacherData: makeSelectUpdateTeacherDetails(),
  
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: LOCAL_STUDENT_FORM_STATE, reducer });
const withSaga = injectSaga({ key: LOCAL_STUDENT_FORM_STATE, saga });

export default compose(
 withReducer,
  withSaga,
  withConnect,
)(StudentForm);
