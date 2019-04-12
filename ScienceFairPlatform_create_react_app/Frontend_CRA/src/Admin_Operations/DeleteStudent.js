import React, { Component, Fragment } from 'react';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';

class DeleteStudent extends Component
{
    constructor(props){
        super(props);
        this.state={
            studentName:'',
            projectId:'',
            projectName:'',
            show: false,
            show_error: false,
        } 
        this.handleChangeStudent = this.handleChangeStudent.bind(this);
        this.handleChangeProjectName = this.handleChangeProjectName.bind(this);
        this.handleChangeProjectId = this.handleChangeProjectId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeStudent(event)
    {
        this.setState({studentName : event.target.value});
    }
    handleChangeProjectName(event)
    {
        this.setState({projectName : event.target.value});
    }
     handleChangeProjectId(event)
    {
        this.setState({projectId : event.target.value});
    }
    async handleSubmit(event)
    {
        event.preventDefault();
        const studentDeleteData= {
            s_name1: this.state.studentName,
            project_title: this.state.projectName,
            project_id: this.state.projectId,

        } 
        console.log("data" , studentDeleteData)
        const response = await fetch(localStorage.getItem("MAIN_URL2")+'/api/admin/deletestudent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(studentDeleteData),
        });
        console.log("res" , response);			
        if(response){
            if (response.ok) 
            {
                response.json().then(json => 
                {
                  console.log("json object" ,json);
                  try{
                    if (json.code === 200) {
                        console.log("all good")
                        this.setState({show:true});  
                     }
                     if (json.code === 400) {
                        console.log("Not Deleted")
                        this.setState({show_error:true});  
                     }
                    
                  }
                  catch(err)
                  {
                      console.log(Error , err) 
                      this.setState({show_error:true});  
                  }
                })
            }
        }

    }



    render()
    {
        const { studentName,projectId ,projectName} = this.state;
        return(
        <Fragment>
            <SweetAlert
            
            show={this.state.show}
            title="Done"
            text=" Student Removed from Sciencefair 2019 Database"
            onConfirm={() => {
            window.location.replace(localStorage.getItem("MAIN_URL1")+'/admin');
                this.setState({ show: false });
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
            <h4>Delete a Student or a Project from the Database</h4> <br/>
            <form onSubmit = {this.handleSubmit} >
            <b>Student Name</b>
                <input  type ="text"
                        value={studentName}
                        onChange={this.handleChangeStudent}/>
            <br/><br/>
            <b>Project Name</b>
                <input type="text"
                        value={projectName}
                        onChange={this.handleChangeProjectName}/>
            <br/><br/>
            <b>Project ID</b>
                <input type="text"
                        value={projectId}
                        onChange={this.handleChangeProjectId}/>
            <br/><br/>
            <button>Delete Student</button>
            </form>
            
        </Fragment>
        );
    }
}
export default DeleteStudent;