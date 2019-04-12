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
import {makeSelectUpdateCurrentStep} from '../selectors';
import {LOCAL_STUDENT_FORM_STATE} from '../constants';
import reducer from '../reducer';
import saga from '../saga';

/* eslint-disable react/prefer-stateless-function */
export class Student_Details extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */ constructor(props)
   {
     super(props)
     this.state =
     {
    studentname: '',
    s_name2:'',
    studentclass:'-1',
    projecttitle:'',
    category:'-1',
    savedData: '',
     }
    }
    handleChange = (e) => 
    {
      this.setState({[e.target.name]: e.target.value})
    } 
    handleStudentDetails = () =>
    {
      const studentData = {
        s_name1 :this.state.studentname,
        s_name2 : this.state.s_name2,
        s_class:this.state.studentclass ,
        project_title:this.state.projecttitle,
        category:this.state.category,
      }
      console.log("student data", studentData);
      //this.props.handleDataList(studentData);
      this.props.onUpdateStudentDetails(studentData);
      this.setState({savedData:"Saved! please click Next"});
      // this.props.onSubmitForm();

    }

  render() {
    const {currentStep } = this.props; 
    if(currentStep!==2)
      { 
        return null
      }

    return (
      <article>
         <div className="form-group">
         <center>
          <label htmlFor="studentname"> Student Name</label>
                        <input
                            className="form-control"
                            id="studentname"
                            name="studentname"
                            type="text"
                            required
                            placeholder="Enter studentname"
                            value={this.state.studentname}
                            onChange={this.handleChange}
                            style={{border: '1px solid black'}}
                            /> <br/><br/>
            <label htmlFor="studentname"> Student Name 2</label>
                        <input
                            className="form-control"
                            id="studentname"
                            name="s_name2"
                            type="text"
                            required
                            placeholder="Enter studentname"
                            value={this.state.s_name2}
                            onChange={this.handleChange}
                            style={{border: '1px solid black'}}
                            />
                            <br/><br/>
             <label htmlFor="studentname"> Student Class </label>
                        <select
                            className="form-control"
                            id="studentname"
                            name="studentclass"
                            required
                            placeholder="Enter student Class"
                            value={this.state.studentclass}
                            onChange={this.handleChange}
                            style={{border: '1px solid black'}}>
                                                        <option value="-1">
                                                        Select Grade
                                                    </option>
                                                    <option value="1">
                                                        Grades 1,2,3 Class(I)
                                                    </option>
                                                    <option value="2">
                                                        Grades 4,5,6 Class(II)
                                                    </option></select>
                             <br/><br/>
             <label htmlFor="projecttitle"> Project Title </label>
                        <input
                            className="form-control"
                            id="projecttitle"
                            name="projecttitle"
                            type="text"
                            required
                            placeholder="Enter Project Title"
                            value={this.state.projecttitle}
                            onChange={this.handleChange}
                            style={{border: '1px solid black'}}
                            /> <br/><br/>
             <label htmlFor="category"> Category </label>
                        <select
                            className="form-control"
                            id="category"
                            name="category"
                            required
                            placeholder="Enter Project Category"
                            value={this.state.category}
                            onChange={this.handleChange}
                            style={{border: '1px solid black'}}>
                            <option value="-1">
                                      Select Category
                                    </option>
                                    <option value="100">
                                      100 Behavioral & Social Sciences
                                    </option>
                                    <option value="200"> 200 Biochemistry</option>
                                    <option value="300">
                                      300 Inorganic Chemistry
                                    </option>
                                    <option value="400">
                                      400 Organic Chemistry
                                    </option>
                                    <option value="500">
                                      500 Earth & Environmental Sciences
                                    </option>
                                    <option value="600">
                                      600 Animal Sciences
                                    </option>
                                    <option value="700">
                                      700 Biomedical and Health Science</option>
                                    <option value="800"> 800 Microbiology</option>
                                    <option value="900">900 Physics and Astronomy</option>
                                    <option value="1000">1000 Engineering and Mechanics</option>
                                    <option value="1100">
                                      1100 Mathematics and System Software
                                    </option>
                                    <option value="1200">1200 Robotic and Intelligent Machines </option>
                                    <option value="1300">
                                      1300 Botony
                                    </option>
                                    </select><br/><br/>
            
            <input type="submit" 
                  value="Save"
                  onClick={this.handleStudentDetails}
                  style={{border: '1px solid black'}}/> 
                  <br/>
                  {this.state.savedData}
            </center>
        </div>
      </article>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    onUpdateStudentDetails: studentData => dispatch(onChangeStudentDetails(studentData)),
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

//const withReducer = injectReducer({ key: LOCAL_STUDENT_FORM_STATE, reducer });
//const withSaga = injectSaga({ key: LOCAL_STUDENT_FORM_STATE, saga });

export default compose(
 //withReducer,
  //withSaga,
  withConnect,
)(Student_Details);
