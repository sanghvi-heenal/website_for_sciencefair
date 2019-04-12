/*
 * DeleteStudent
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
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';
import { Link, withRouter , Redirect } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from '../AtPrefix';
import Button from '../../../components/Button';
import CenteredSection from '../CenteredSection';
import Form from '../Form';
import Input from '../Input';
import Section from '../Section';
import messages from '../messages';
import { loadStudentDeletion } from '../../App/actions';
import { changeDeleteStudent} from '../actions';
import {makeSelectStudentDeletionResponse } from '../selectors';
import {LOCAL_STUDENT_DELETION} from '../constants';
import reducer from '../reducer';
import saga from '../saga';


export class DeleteStudent extends React.PureComponent {

          constructor(props){
            super(props);
            this.state={
                studentName:'',
                projectId:'',
                projectName:'',
                show: false,
                show_error: false,
                deleteStatus:'',
            } 
          }


  handleChangeStudent = (event) =>
    {
        this.setState({studentName : event.target.value});
    }
    handleChangeProjectName = (event) =>
    {
        this.setState({projectName : event.target.value});
    }
     handleChangeProjectId = (event) =>
    {
        this.setState({projectId : event.target.value});
    }
    handleSubmit = () =>
    {
      const {studentName, projectName, projectId} = this.state;
        const deleteStudent = {
          s_class: studentName,
           project_title: projectName,
            project_id: projectId,
          
        }
        console.log("deleteStudent",deleteStudent);
        this.props.onUpdateDeleteStudent(deleteStudent);
        this.props.onSubmitDeletion();
    }

  render() {
    const { studentName,projectId ,projectName, deleteStatus,show,show_error} = this.state;
    const { studentdelresponse} = this.props;  
    if(studentdelresponse.code== 200)
        {
          console.log("start redirecting");
          this.setState({deleteStatus:''});
          this.setState({show: true });
          studentdelresponse.code= 0;
          studentdelresponse.status= false;
          //this.props.onUpdatedelResponse(studentdelresponse);
          console.log("show now", show);

        }
       if(studentdelresponse.code==400)
       {
          console.log("not valid")
          this.setState({show: false });
          console.log("show now", show);
          this.setState({deleteStatus:'No Student from Database'});
        }
    return (
      <article>
        <AtPrefix>
        <Button onClick ={ () => {window.location.replace("http://localhost:3000/adminoperations")}}> Admin Logout</Button>
        <SweetAlert
            
            show={this.state.show}
            title="Done"
            text=" Student Removed from Sciencefair 2019 Database"
            onConfirm={() => {
                this.setState({ show: false });
                return ( <Redirect to="/adminoperations"/>);
                }}
        />
            <SweetAlert
                className="red-bg"
                show={this.state.show_error}
                title="Error in Removing the Student from Database"
                text={this.state.message}   
                onConfirm={() => this.setState({ show_error: false })}
            />
            
            <br/><br/>
            <center>
            <h4>Delete a Student or a Project from the Database</h4>
            <b>Student Name:</b>
                <input  type ="text"
                        value={studentName}
                        onChange={this.handleChangeStudent}
                        style={{border: '1px solid black'}}/>
            <br/><br/>
            <b>Project Name:</b>
                <input type="text"
                        value={projectName}
                        style={{border: '1px solid black'}}
                        onChange={this.handleChangeProjectName}/>
            <br/><br/>
            <b>Project ID:</b>
                <input type="text"
                        value={projectId}
                        style={{border: '1px solid black'}}
                        onChange={this.handleChangeProjectId}/>
            <br/><br/>
            <input type="submit"
                  value="Delete Student"
                  onClick={this.handleSubmit}
                  style={{border: '1px solid black'}}
                  />
                  <h2>{this.state.deleteStatus}</h2>
        </center>


        </AtPrefix>

      </article>
    );
  }
}



export function mapDispatchToProps(dispatch) {
  return {
    onUpdateDeleteStudent: deleteStudent => dispatch(changeDeleteStudent(deleteStudent)),
    onSubmitDeletion: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadStudentDeletion());
    },
  };
}

const mapStateToProps = createStructuredSelector({
studentdelresponse: makeSelectStudentDeletionResponse(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: LOCAL_STUDENT_DELETION, reducer });
const withSaga = injectSaga({ key: LOCAL_STUDENT_DELETION, saga });

export default compose(
 withReducer,
 withSaga,
  withConnect,
)(DeleteStudent);
