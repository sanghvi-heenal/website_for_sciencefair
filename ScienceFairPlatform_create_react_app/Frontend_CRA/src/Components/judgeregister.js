import React from 'react';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';
const inputParsers = {
  date(input) {
    const [month, day, year] = input.split('/');
    return `${year}-${month}-${day}`;
  },
  uppercase(input) {
    return input.toUpperCase();
  },
  number(input) {
    return parseFloat(input);
  },
};

class Judgeregister extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
	 this.state = {
          name : '',
          email:'',
          message:'',
          password:'',
          errorName:'',
          errorEmail:'',
          errorPassword: '',
          show:false,
		      show_error:false,
          message:'',
          categoryI: '',
          categoryII: '',
          data: {},
          submiError:'',
          isNameValid:false,isEmailValid:false , isPasswordValid:false, 
          isCategoryI:false , isCategoryII:false,
        
		  
          
        };
      this.handleNameInput = this.handleNameInput.bind(this);
      this.handleEmailInput = this.handleEmailInput.bind(this);
      this.handlePasswordInput = this.handlePasswordInput.bind(this);
      this.handleCategoryIInput = this.handleCategoryIInput.bind(this);
      this.handleCategoryIIInput = this.handleCategoryIIInput.bind(this);
  }

  handleNameInput(e){
    const { name} = this.state;
    console.log("name" , e.target.value)
    this.setState({ name:e.target.value});
    if(name == '')
    {
      const r = 'Name Cannot be empty'
      this.setState({errorName: r })
      return;
    }
    if(name.length < 4)
    {
      const r = "Name should be more than four characters"
      this.setState({errorName: r })
      return;
    }
    this.setState({errorName:''})
    //console.log("name", this.name);
    this.isNameValid= true;
    console.log("name valid" ,this.isNameValid);
  }

  handleEmailInput(e){
            const { email} =this.state;
           console.log("email" , e.target.value)
            this.setState({ email:e.target.value});
            if(email == '')
            {
              const r = 'Email Cannot be empty'
              this.setState({errorEmail: r })
              return;
            }
            if( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                                                                                        .test(email)==false)
            {
              const r = "Provide right Email address"
              this.setState({errorEmail: r })
              return; 
            }
            this.setState({errorEmail:''})
           // console.log("name", this.errorEmail );
            this.isEmailValid= true;
  }

  handlePasswordInput(e){
    const {password} = this.state;
            console.log("password" , e.target.value)
            this.setState({ password:e.target.value});
           console.log("password", this.password);
            if(password == '')
            {
              const r = 'password Cannot be empty'
              this.setState({errorPassword: r , enable : false })
              return;
            }
            if(password.length < 6)
            {
              const r = "password should have more than six characters"
              this.setState({errorPassword: r ,enable : false  })
              return;
            }
            this.setState({errorPassword:''})
            this.isPasswordValid= true;
  }

  handleCategoryIInput (e)
    {
      console.log("cat" , e.target.value)
      this.setState({ categoryI: e.target.value})
              if(this.state.categoryI =="-1")
              {
                const r = "choose one option"
                this.setState({errorCategoryI: r});
                return;
              }

              this.isCategoryI = true;
    }
  handleCategoryIIInput (e)
    {
      console.log("cat2" , e.target.value);
        this.setState({ categoryII : e.target.value})
        if(this.state.categoryII == "-1")
        {
          const r = "choose one option"
          this.setState({errorCategoryII: r});
          return;
        }

        this.isCategoryII = true;
    }

  handleSubmit(event) 
  {
    // const {isNameValid , isEmailValid , 
    //   isPasswordValid, isCategoryI,isCategoryII} = this.state;
    // if(isNameValid|| isEmailValid|| isPasswordValid|| isCategoryI || isCategoryII)
    // {
    event.preventDefault();
    const form = event.target;
    //const data = new FormData(form);
    this.state.data  =
                     {
                       name: this.state.name,
                       login_email: this.state.email,
                       password: this.state.password,
                       category_1:this.state.categoryI,
                       category_2 : this.state.categoryII,
                     }
                     console.log(this.state.data);
    console.log("data in form", this.state.data);
    this.setState({submiError: ''})
    fetch(localStorage.getItem("MAIN_URL2")+'/api/user/judgeregister', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(this.state.data),
    }).then((response) => response.json())  
   .then((res) => {
        if(res.code==200){
            this.setState({show:true});
        }
        else {
			 this.setState({show_error:true,message:res.message});
         
          return false;
        }
        })
      .then(data =>{
          if(data.status==true)
          {
            var user_id=data._id;
            window.location.replace(localStorage.getItem("MAIN_URL1")+'/judgedashboard');
          }
          else
          {
            this.setState({show_error:true});
          }
	      })   
      .catch((error) => {

      });
  // }
  // else{
  //   this.setState({submiError : "Form is Incomplete"})
  // }
}

  render() {
    return (
	<div>
	  <SweetAlert
	    
        show={this.state.show}
        title="Done"
        text="Judge Registration Successful"
        onConfirm={() => {
          window.location.replace(localStorage.getItem("MAIN_URL1"));
            this.setState({ show: false });
			}}
      />
	   <SweetAlert
	      className="red-bg"
        show={this.state.show_error}
        title="Error"
        text={this.state.message}   
        onConfirm={() => this.setState({ show_error: false })}
      />
      <form onSubmit={this.handleSubmit}>
        <br/><br/>
       <table className="customtable" cellpadding="2" width="50%" cellspacing="4">    
          <tr><td><b>Name:</b></td><td><b>  
            <input type="text" 
                    name="name"
                    value ={this.state.name}
                   onChange ={this.handleNameInput} 
                    />
                   <br/> {this.state.errorName}</b></td></tr>

           <tr><td><b>Email:</b></td><td>
             <b><input type="email"  
                       required name="login_email" 
                       value={this.state.email}
                       onChange={this.handleEmailInput}
                       />
                      <br/> {this.state.errorEmail}</b></td></tr>
          <tr><td><b>Password:</b></td><td><b>
                <input type="password"  
                        required name="password"
                        value={this.state.password}
                        onChange={this.handlePasswordInput}   
                         />
                        <br/>{this.state.errorPassword}</b></td></tr>
          <br/><tr><b>Choose the category you wish to judge</b></tr>
          <tr><td><b>Category-I:</b></td><td><b> 
									  <select         name="categoryI"
                                    autoComplete="off" 
                                    defaultValue="-1"
                                    value={this.state.categoryI}
                                    onChange={this.handleCategoryIInput} 
                                    required
                                     >
                                    <option value="-1">
                                       Select Category I
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
                                    
                                        </select>
                                        {this.state.errorCategoryI}
		  </b></td></tr>
          <tr><td><b>Category-II:</b></td><td><b>	<select
                                    name="category_II"
                                    autoComplete="off" 
                                    defaultValue="-1"
                                    value={this.state.categoryII}
                                    onChange={this.handleCategoryIIInput}
                                    required >
                                    <option value="-1">
                                       Select Category II
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
                                    </select>
                                    {this.state.errorCategoryII}</b></td></tr>
                                    </table>
<br/><br/><br/><br/>

<br/><br/>

  <h3 style={{WebkitTextFillColor: "white" , padding:" 5px 60px"}}>CONFLICTS OF INTEREST:</h3>
  <center>
<p  style={{WebkitTextFillColor: "white",  padding:" 2px 60px"}}> <br/><b> Please inform the MS Region 1 SEF Directors of ANY conflicts 
  of interest you may have in judging science fair before judging instructions. 
  You MAY STILL JUDGE if you have a conflict of interest.
   Our Staff will ENSURE you are NOT assigned an inappropriate judge sheet.</b></p>
   <input   type="checkbox" required/><font size="3" style={{WebkitTextFillColor: "white"}}>  <b>    I certify that I do NOT have ANY conflicts of interest</b>  </font>
   </center>
    









          
          
                                    {/* <option value="1500">Team Project</option> */}
                                        
         {/*  <tr><td><b>Category:</b></td><td><b>	<select
                                    name="category_3"
                                    autoComplete="off"
                                    className="form-control custominput"
                                    required
                                  
                                     >
                                   <option value="-1" selected>select category 3</option>
                                    <option value="100">Behavioral & Social Sciences</option>
                                    <option value="200">Biochemistry</option>
                                    <option value="300">Inorganic Chemistry</option>
                                    <option value="400">Organic Chemistry</option>
                                    <option value="500">Earth & Environmental Sciences</option>
                                    <option value="700">Medicine & Health</option>
                                    <option value="800">Animal Science</option>
                                    <option value="900">Microbiology</option>
                                    <option value="1000">Animal Science</option>
                                    <option value="1100">Physics and Astronomy</option>
                                    <option value="1200">Engineering</option>
                                    <option value="1300">Computer Science and Math</option>
                                    <option value="1400">Robotics</option>
                                    <option value="1500">Team Project</option>
                                        </select></b></td></tr>
          <tr><td><b>Category:</b></td><td><b>
		  	<select
                                    name="category_4"
                                    autoComplete="off"
                                    className="form-control custominput"
                                    
                                    
                                     >
                                    <option value="-1" selected>select category 4</option>
                                    <option value="100">Behavioral & Social Sciences</option>
                                    <option value="200">Biochemistry</option>
                                    <option value="300">Inorganic Chemistry</option>
                                    <option value="400">Organic Chemistry</option>
                                    <option value="500">Earth & Environmental Sciences</option>
                                    <option value="700">Medicine & Health</option>
                                    <option value="800">Animal Science</option>
                                    <option value="900">Microbiology</option>
                                    <option value="1000">Animal Science</option>
                                    <option value="1100">Physics and Astronomy</option>
                                    <option value="1200">Engineering</option>
                                    <option value="1300">Computer Science and Math</option>
                                    <option value="1400">Robotics</option>
                                    <option value="1500">Team Project</option>
                                        </select></b></td></tr>
                                         */}
		        {/* <tr><td><b></b></td><td><b> <button>Register!</button></b></td></tr> */}
          
            
          <br/><br/>
           <center> <b> <button>Register!</button>
                    {this.state.submiError}</b></center>
      </form>  
</div>	  
    );
  }
}

export default Judgeregister;   