import React, { Component, Fragment } from 'react';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';

class DeleteJudge extends Component
{
    constructor(props){
        super(props); 
        this.state={
            judgeName:'',
            judgeEmail:'',
            value:'',
            show: false,
            show_error: false,
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
        const judgeDeleteData= {
            name:this.state.judgeName,
            login_email: this.state.judgeEmail,

        } 
        console.log("data" , judgeDeleteData);
        const response = await fetch(localStorage.getItem("MAIN_URL2")+'/api/admin/deletejudge', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(judgeDeleteData),
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
                      this.setState({show_error: true});
                      console.log(Error , err) 
                  }
                })
            }
        }
    }



    render()
    {
        const { judgeName,judgeEmail , value} = this.state;
        return(
            <Fragment>
                    <SweetAlert
                
                show={this.state.show}
                title="Done"
                text=" Judge is Removed from Sciencefair 2019 Database"
                onConfirm={() => {
                window.location.replace(localStorage.getItem("MAIN_URL1")+'/admin');
                    this.setState({ show: false });
                    }}
            />
                <SweetAlert
                    className="red-bg"
                    show={this.state.show_error}
                    title="Error Removing the Judge"
                    text={this.state.message}   
                    onConfirm={() => this.setState({ show_error: false })}
                />
               
                <h4>Delete a Judge from the Database</h4>
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
                    <button>Delete Judge</button>
                    </form>

                  
            </Fragment>

        );
    }
}
export default DeleteJudge;