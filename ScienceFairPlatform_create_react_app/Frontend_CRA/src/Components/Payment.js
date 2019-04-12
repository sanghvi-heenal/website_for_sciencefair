import React from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'sweetalert-react'; // eslint-disable-trne import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';
import './look.css';
const axios = require('axios');


class Payment extends React.Component
{
    constructor(props) {
        super(props);
       this.handleSubmit = this.handleSubmit.bind(this);
	    this.state = {
          show:false,
		  show_error:false
		  
          
        };
    }

    handleSubmit(event) {
		event.preventDefault();
		
		window.sessionStorage.removeItem('step');
		const form = event.target;
		const data = new FormData(form);
        console.log("============> clcicked", this.props.getStore());   
	
		 fetch(localStorage.getItem("MAIN_URL2")+'/api/user/register', {
		  method: 'POST',
		  body:data,   
		}).then((response) => response.json())  
   .then((res) => {
        if(res.code==200){
            // console.log(res);
            this.setState({show:true});

        }
        else {
			 this.setState({show_error:true});
         
          return false;
        }
   })  
   .catch((error) => {

   });
      
    }

    render()
    {

		console.log("student name",this.props.getStore().s_name1)
		console.log("Summary DOC",this.props.getStore().summary_doc)
        return(

            <div>
            <br/><br/>
			 <SweetAlert
	    
        show={this.state.show}
        title="Done"
        text="  Registered sucessfully , please check the registered email "
        onConfirm={() => {
          window.location.replace(localStorage.getItem("MAIN_URL1")+"/registered");
            this.setState({ show: false });
			}}
      />
	   <SweetAlert
	      className="red-bg"
        show={this.state.show_error}
        title="Error"
        text="Something Went Wrong"
        onConfirm={() => this.setState({ show_error: false })}
      />
			<h3>Please confirm the below details</h3>
      <table className="finalDisplay"
			cellpadding="2"
			width="50%"
			border="5"
			cellspacing="4"
			align="center">
			
	
		
				<tr>
				<td> Student(1) Name:</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().s_name1}</td>
				</tr>
				<tr>
				<td> T-shirt Size(Student(1)):</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().size_data_1}</td>
				</tr>
				<tr>
				<td> Student(2) Name:</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().s_name2}</td>
				</tr>
				<tr>
				<td> T-shirt Size(Student(2)):</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().size_data_2}</td>
				</tr>
				<tr>
				<td> Student Grade:</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().grade}</td>
				</tr>
				<tr>
				<td> Student Class:</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().s_class}</td>
				</tr>
				<tr>
				<td> School Name :</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().sc_name1}</td>
				</tr>
				<tr>
				<td>Project Title:</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().title}</td>
				</tr>
				<tr>
				<td>category:</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().category}</td>
				</tr>
				<tr>
				<td>T-Shirt Payment method:</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().tshirt_payment}</td>
				</tr>
				<tr>
				<td>Fee Payment method:</td><td style={{WebkitTextFillColor : "White"}}>{this.props.getStore().fee_payment}</td>
				</tr>

				

			</table>
			 <form onSubmit={this.handleSubmit}>
			{/* <input name="teamname" type="hidden" value={this.props.getStore().teamname}/>
			<input name="password" type="hidden" value={this.props.getStore().password}/>
			<input name="email" type="hidden" value={this.props.getStore().email}/> */}
			<input name="teacher_f_name" type="hidden" value={this.props.getStore().f_name}/>
			<input name="teacher_last_name" type="hidden" value={this.props.getStore().l_name}/>
			<input name="teacher_email" type="hidden" value={this.props.getStore().t_email}/>
			<input name="sc_name1" type="hidden" value={this.props.getStore().sc_name1}/>
			<input name="s_phone" type="hidden" value={this.props.getStore().s_phone}/>
			<input name="s_name1" type="hidden" value={this.props.getStore().s_name1}/>
			<input name="s_name2" type="hidden" value={this.props.getStore().s_name2}/>
			<input name="s_name3" type="hidden" value={this.props.getStore().s_name3}/>
			<input name="grade" type="hidden" value={this.props.getStore().grade}/>
			<input name="s_class" type="hidden" value={this.props.getStore().s_class}/>
			<input name="project_title" type="hidden" value={this.props.getStore().title}/>
			<input name="category" type="hidden" value={this.props.getStore().category}/>
			{/* <input name="sc_name2" type="hidden" value={this.props.getStore().sc_name2}/> */}
			<input name="shirt_sizes_1" type="hidden" value={this.props.getStore().size_data_1}/>
			<input name="shirt_sizes_2" type="hidden" value={this.props.getStore().size_data_2}/>
			<input name="shirt_sizes_3" type="hidden" value={this.props.getStore().size_data_3}/>
			<input name="tshirt_payment" type="hidden" value={this.props.getStore().tshirt_payment}/>
			<input name="fee_payment" type="hidden" value={this.props.getStore().fee_payment}/>
			<input name="summary" type="hidden" value={this.props.getStore().summary}/>
			<input name="summary_doc" type="hidden" value={this.props.getStore().summary_doc}/>
			<input name="form_doc" type="hidden" value={this.props.getStore().form_doc}/>
					<button><font size='5'> Register </font></button>
			</form>
               
            </div>




            
        );
    }
}
export default Payment;