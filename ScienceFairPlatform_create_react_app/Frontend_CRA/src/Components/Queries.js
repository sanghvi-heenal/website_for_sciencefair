import React from 'react';
import { Link } from 'react-router-dom';
import './look.css';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';

class queries extends React.Component
{
	 constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		 this.state = {
          show:false,
		  show_error:false
		  
          
        };
	  }
	  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    // for (let name of data.keys()) {
      // const input = form.elements[name];
      // const parserName = input.dataset.parse;

      // if (parserName) {
        // const parser = inputParsers[parserName];
        // const parsedValue = parser(data.get(name));
        // data.set(name, parsedValue);
      // }
    // }
    
    fetch(localStorage.getItem("MAIN_URL2")+'/api/user/contact', {
      method: 'POST',
      body: data,
    }).then((response) => response.json())  
   .then((res) => {
        if(res.code==200){
            // console.log(res);
            this.setState({show:true});
            console.log("response", res.message);
	

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
        // console.log("contactus");
        return( <div >
		   <SweetAlert
	    
        show={this.state.show}
        title="Done"
        text="Thanks for contacting with us"
        onConfirm={() => {
          window.location.replace(localStorage.getItem("MAIN_URL1"));
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
      <center>
		 <form onSubmit={this.handleSubmit}>        
            
                <br/><br/>
				    
             <br/> <br/>
             
            <table  width="50%" border="5" cellspacing="4" style={ {WebkitTextFillColor:"White" } }>

                <tr><td> <font size="5"> <b>Name</b> </font></td><td style={{ WebkitTextFillColor: "black"}}>  < input name="name" placeholder="Enter name" type="text"/></td></tr><br/><br/>
                <tr><td> <font size="5"><b>Email</b> </font></td><td style={{ WebkitTextFillColor: "black"}}><input name="email" placeholder="Enter Email" type="email"/></td></tr> <br/><br/>
                <tr><td><font size="5"><b>Post your Query</b> </font></td><td style={{ WebkitTextFillColor: "black" }} ><textarea name="query" emailrows="10" cols="100"></textarea></td></tr>
              </table>
              
              <br/><br/><br/><button style={{WebkitTextFillColor : "Brown"}}> <font size="5">SEND</font></button>
               
                
				   </form>
                <br/> <br/> <br/> <br/> 
                <table  style={ {WebkitTextFillColor:"White" } }>
               <tr>
                  <b><font size="6">Contact Information </font> </b>
               </tr>
               <tr><font size="5"> <td > 
               
                  
                  Johnson Science Tower (JST) 314 </td></font>  </tr>
                 <tr><td><font size="5"> 118 College Drive #5087</font> </td>  <td> <font size="5">Email:  Region1mesf@gmail.com </font><br/></td> </tr>
                 <tr><td><font size="5"> Hattiesburg, MS 39406 </font></td><td><font size="5">kendrick.buford@usm.edu </font><br/> </td></tr>
                 <tr><td><font size="5"> Phone: 601.266.4739 </font></td> <td><font size="5">sherry.herron@usm.edu</font></td>  </tr>
                 <tr><td><font size="5"> Fax: 601.266.6145 </font> </td></tr>
                  
                  
             </table>
             </center>
          </div>

        );
    }
    }

export default queries;