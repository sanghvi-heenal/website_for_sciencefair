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
import {onChangeCurrentStep ,onChangeTeacherDetails} from '../actions';
import {makeSelectUpdateCurrentStep} from '../selectors';
import {LOCAL_STUDENT_FORM_STATE} from '../constants';
import reducer from '../reducer';
import saga from '../saga';

/* eslint-disable react/prefer-stateless-function */
export class Teacher_Details extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */ constructor(props)
   {
     super(props)
     this.state =
     {
    tname:'',
    email: '',
    schoolname:'',
    savedData: '',
   
     }
    }
    handleChange = (e) => 
    {
      this.setState({[e.target.name]: e.target.value})
    }  
    handleTeacherDetails= () =>
    {
      const teacherData = {
        teacher_f_name:this.state.tname,
        teacher_email :this.state.email,
        sc_name_1: this.state.schoolname
      }
      console.log("teacher data", teacherData);
      //this.props.handleDataList(teacherData);
      this.props.onUpdateTeacherDetails(teacherData);
      this.setState({savedData:"Saved! please click Next"})
      // this.props.onSubmitForm();

    }

  render() {
    const {currentStep} = this.props;
    if(currentStep!==1)
      { 
        return null
      }

    return (
      <article>
         <div className="form-group">
         <center>
          <label htmlFor="name"> Teacher Name</label>

                        <input
                          className="form-control"
                          id="tname"
                          name="tname"
                          type="text"
                          required
                          placeholder="Enter Name"
                          value={this.state.tname}
                          onChange={this.handleChange}
                          style={{border: '1px solid black'}}
            /><br/> <br/>
            <label htmlFor="email"> Teacher Email</label>

                          <Input
                            className="form-control"
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            style={{border: '1px solid black'}}
                            />
             <br/><br/>
            <label htmlFor="email"> School Name</label>

                            <input
                            className="form-control"
                            id="school"
                            name="schoolname"
                            type="text"
                            required
                            placeholder="Enter School Name"
                            value={this.state.schoolname}
                            onChange={this.handleChange}
                            style={{border: '1px solid black'}}
                            />

            <br/><br/>
            
            <input type="submit" 
                  value="Save"
                  onClick={this.handleTeacherDetails}
                  style={{border: '1px solid black'}}/><br/>
                  {this.state.savedData}
            </center>
        </div>

      </article>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
     onUpdateTeacherDetails: teacherData => dispatch(onChangeTeacherDetails(teacherData)),
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(loadStudentForm());
    // },
  };
}

const mapStateToProps = createStructuredSelector({
  currentStep: makeSelectUpdateCurrentStep(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: LOCAL_STUDENT_FORM_STATE, reducer });
//const withSaga = injectSaga({ key: LOCAL_STUDENT_FORM_STATE, saga });

export default compose(
 withReducer,
 // withSaga,
  withConnect,
)(Teacher_Details);
