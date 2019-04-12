import React, { Component, Fragment } from 'react';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';

class AssignProjects extends Component
{
    constructor(props){
        super(props); 
        this.state={
            judgeName:'',
            judgeEmail:'',
            value:'',
            show: false,
            show_error: false,
            AssignNumber: 0,
        }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail =this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event)
    {
        this.setState({judgeName : event.target.value});
    }
    handleChangeEmail (event)
    {
        
        this.setState({judgeEmail: event.target.value});

    }

    async handleSubmit(event)
    {
        event.preventDefault();
        const judgeGetData= {
            name:this.state.judgeName,
            login_email: this.state.judgeEmail,

        } 
        console.log("data" , judgeGetData);
        const response = await fetch(localStorage.getItem("MAIN_URL2")+'/api/assignProjects/assign', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(judgeGetData),
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
                        console.log("all good number" , json.count)
                        this.setState({show:true , AssignNumber : json.count});  
                     }
                    if (json.code === 400) {
                        console.log("Not Assigned")
                        this.setState({show_error:true});  
                    }
                  }
                  catch(err)
                  {
                      //this.setState({show_error: true});
                      console.log(Error , err) 
                  }
                })
            }
        }
    }



    render()
    {
        const { judgeName,judgeEmail , value , AssignNumber} = this.state;
        return(
            <Fragment>
                    <SweetAlert
                
                show={this.state.show}
                title="Done"
                text= 'Assigned 0 to 5  more projects'
                onConfirm={() => {
                    
                window.location.replace(localStorage.getItem("MAIN_URL1")+'/admin');
                    this.setState({ show: false });
                    }}
            />
                <SweetAlert
                    className="red-bg"
                    show={this.state.show_error}
                    title="Error Assigning More Projects"
                    text={this.state.message}   
                    onConfirm={() => this.setState({ show_error: false })}
                />
               
                <h4>Assign More Projects to a Judge</h4>
                <form name="form" 
                      onSubmit={this.handleSubmit}>
                <br/>
                <label>
                <b>Judge Name</b>
                    <input  type ="text" name="name"
                            value={judgeName}  
                            onChange={this.handleChangeName}
                           />
                </label>
                <br/><br/>
                <b>Judge Email</b>
                    <input  type="email"
                            required name="email"
                            value={judgeEmail}
                            onChange={this.handleChangeEmail}
                            />
                            {/* Onchange={this.handleChange} */}
                <br/><br/>
                    <button>Assign Projects</button>
                    </form>

                  
            </Fragment>

        );
    }
}
export default AssignProjects;