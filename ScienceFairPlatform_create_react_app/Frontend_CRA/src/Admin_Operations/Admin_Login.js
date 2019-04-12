import React, { Component } from 'react';
import axios from 'axios';
import { Link ,Redirect ,withRouter } from 'react-router-dom';

export class Admin_Login extends Component {

                constructor(props)
                {
                super(props);
                this.state={
                admin_email:'',
                admin_password:'',
                admin:{},
                show:false,
                loginStatus:'',

                }
                this.handleSubmit = this.handleSubmit.bind(this);
                }
                handleChange = (e) =>
                {
                  this.setState({[e.target.name] : e.target.value})
                }
                async  handleSubmit (event) 
                {
                  const AdminData = {
                    admin_email: this.state.admin_email,
                    admin_password : this.state.admin_password,
                  }
                  try {
                    
                    const response = await axios.post(
                        localStorage.getItem("MAIN_URL2")+'/api/admin/login',
                        AdminData
                    );
        
                    const { data } = response;
                    // console.log('data code', data.code);
                    if (data.code === 200 || data.status === true) {
                        console.log("data message" , data.message);
                        this.setState({loginStatus: ""})
                        const show = true;
                         localStorage.setItem('admin', JSON.stringify(show));
                        this.props.history.push('/admin')
                       
                    }
                    else{
                    console.log('404 found', data.message);
                    this.setState({ show_error: true,  loginStatus:'INCORRECT CREDENTAILS' });
                    return null;
                    }
                } catch (error) {
                    console.log('error');
                    this.setState({ show_error: true,  loginStatus:'INCORRECT CREDENTAILS' });
                    return null;
                }

                }
                

    render()
    {
        const retrievedObject = localStorage.getItem('admin');
			const show =  JSON.parse(retrievedObject);
			console.log("show in admin",show);
        return (
            <React.Fragment>
            {/* {show &&
              
                 } */}
            {!show&&<div>
                                <center>
                                 <h2>Admin Login</h2>
                                                <br/>
                                                 <label>Email:</label>
                                                 <input
                             type="email"
                             name="admin_email"
                             value={this.state.admin_email}
                             onChange={this.handleChange}
                             style={{border: '1px solid black'}}/>
                                         
                           <br/><br/>
                                                 <label>Password:</label>
                                                 <input
                             type="password"
                             name="admin_password"
                             value={this.state.admin_password}
                             onChange={this.handleChange}
                             style={{border: '1px solid black'}}
                                                    	/><br/>
                                 <input
                                    type="submit"
                                    value="Login"
                                    onClick={this.handleSubmit}
                                    color="primary"
                                    className="btn btn-primary"
                                    style={{border: '1px solid black'}}	/> 
                                             <h2>{this.state.loginStatus}</h2>
                                             </center>
                                             </div>
            }
           </React.Fragment>
        );
    }
}

export default withRouter (Admin_Login);