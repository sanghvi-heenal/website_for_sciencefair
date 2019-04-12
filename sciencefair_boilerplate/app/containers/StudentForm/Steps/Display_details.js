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
import H2 from '../../../components/H2';
import ReposList from '../../../components/ReposList';
import AtPrefix from '../AtPrefix';
import CenteredSection from '../CenteredSection';
import Form from '../Form';
import Input from '../Input';
import Section from '../Section';
import messages from '../messages';
import { loadStudentForm } from '../../App/actions';
import {onChangeCurrentStep, onChangeStudentDetails} from '../actions';
import {makeSelectUpdateCurrentStep , makeSelectUpdateTeacherDetails,
  makeSelectUpdateStudentDetails, makeSelectUpdateErrorinRegistration} from '../selectors';
import {LOCAL_STUDENT_FORM_STATE} from '../constants';
import reducer from '../reducer';
import saga from '../saga';

/* eslint-disable react/prefer-stateless-function */
export class Display_Details extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */ constructor(props)
   {
     super(props)
     this.state =
     {
         show:false,
         show_error:false,
     }
    }
    handleRegister = ( )=>
     {
         this.state.show=true;
         this.props.handleRegister(this.state.show)
     }
  render() {
    const {currentStep, teacherData , studentData} = this.props;
    if(currentStep!==3)
      { 
        return null
      }

    return (
      <article>
          
          <h2>Verify Registration Details and Register</h2>
          <h4>Teacher Details</h4>
          <ul>
              <li><b>Teacher Name</b>:  <font size='3'>{teacherData. teacher_f_name}</font></li>
              <li><b>Teacher Email</b>:  <font size='3'>{teacherData. teacher_email}</font></li>
              <li><b>School Name</b>:<font size='3'>{teacherData.sc_name_1}</font></li>
          </ul>
          <h4>Student Details</h4>
          <ul>
          <li><b>Student Name</b>:  <font size='3'>{studentData.s_name1}</font></li>
          <li><b>Student Name 2</b>:  <font size='3'>{studentData.s_name2}</font></li>
              <li><b>Class</b>:  <font size='3'>{studentData.s_class}</font></li>
              <li><b>Project Title</b>: <font size='3'>{studentData.project_title}</font></li>
              <li><b>Category </b>: <font size='3'>{studentData.category}</font></li>
          </ul>
          <center>
          <input type="submit" 
                  value="Register"
                  onClick={this.handleRegister}
                  style={{border: '1px solid black'}}/>
                  <br/> {this.props.errorStatus}
        </center>
      </article>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    // onUpdateStudentDetails: dataList => dispatch(onChangeStudentDetails(dataList)),
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(loadStudentForm());
    // },
  };
}

const mapStateToProps = createStructuredSelector({
  currentStep: makeSelectUpdateCurrentStep(),
  teacherData:makeSelectUpdateTeacherDetails(),
  studentData: makeSelectUpdateStudentDetails(),
  errorStatus: makeSelectUpdateErrorinRegistration(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);



export default compose(
  withConnect,
)(Display_Details);
