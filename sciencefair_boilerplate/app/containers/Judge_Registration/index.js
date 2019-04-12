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
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Section from './Section';
import messages from './messages';
import Input from './Input';
import Form from './Form';
import { loadJudgeRegistration } from '../App/actions';
import {changeJudgeRegisterData} from './actions';
import {LOCAL_JUDGE_STATE_NAME} from './constants';
import {makeSelectJudgeResponse } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { LocalForm } from 'react-redux-form';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';
import styled from 'styled-components';

// const Wrapper = styled.section`
//   padding: 12px 20px;
//   margin: 8px 0;
//   box-sizing: border-box
//   border: none;
//   background-color: #3CBC8D;
//   `;
//   const InputArea = styled.input`
//   width: 100%;
//   padding: 12px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   resize: vertical;
//   ;`
// const Input = styled.input`
//   font-size: 1.45em;
//   border: 1px solid #ddd;
// `;


const Title = styled.h5`
  margin-top: 40px;
  margin-bottom: 70px;
  font-size: 1.5em;
  color: black;
  background-color:#41addd;
`;


/* eslint-disable react/prefer-stateless-function */
export class Judge_Registration extends React.PureComponent {
        
  
  
  
      constructor(props)
      {
              super(props);
              this.state = 
              {
                        name : '',
                        email:'',
                        message:'',
                        password:'',
                        categoryI:'',
                        categoryII:'',
                        data:{},
                        errorName:'',
                        errorEmail:'',
                        errorPassword: '',
                        errorCategoryI:'',
                        errorCategoryII:'',
                        submitError:'', 
                        submitstatus:false ,
                        show:false,
                        show_error:false,
            }
            this.judgeName = React.createRef();
            this.judgeEmail = React.createRef();
            this.judgePassword = React.createRef();
            this.judgeCategoryI = React.createRef();
            this.judgeCategoryII = React.createRef();
            this.handleNameInput=this.handleNameInput.bind(this);
             this.handleEmailInput=this.handleEmailInput.bind(this);
             this.handlePasswordInput = this.handlePasswordInput.bind(this);
            this.judgeRegister = this.judgeRegister.bind(this);
          }

          handleNameInput(){
            this.name = this.judgeName.current.value;
            if(this.name == '')
            {
              const r = 'Name Cannot be empty'
              this.setState({errorName: r })
              return;
            }
            if(this.name.length < 4)
            {
              const r = "Name should be more than four characters"
              this.setState({errorName: r })
              return;
            }
            this.setState({errorName:''})
            //console.log("name", this.name);
            this.isNameValid= true;
            console.log("name valide" ,this.isNameValid);
          }
          handleEmailInput(){
            this.email = this.judgeEmail.current.value;
            console.log(this.email);
            if(this.email == '')
            {
              const r = 'Email Cannot be empty'
              this.setState({errorEmail: r })
              return;
            }
            if( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                                                                                        .test(this.email)==false)
            {
              const r = "Provide right Email address"
              this.setState({errorEmail: r })
              return;
            }
            this.setState({errorEmail:''})
           // console.log("name", this.errorEmail );
            this.isEmailValid= true;
  }
          handlePasswordInput()
          {
            this.password = this.judgePassword.current.value;
            if(this.password == '')
            {
              const r = 'password Cannot be empty'
              this.setState({errorPassword: r , enable : false })
              return;
            }
            if(this.password.length < 6)
            {
              const r = "password should have more than six characters"
              this.setState({errorPassword: r ,enable : false  })
              return;
            }
            this.setState({errorPassword:''})
            this.isPasswordValid= true;
        }
 
          judgeRegister()
          {
           
                     
                     console.log("inside judge register");
                     console.log("data", this.state.data);
                     this.name = this.judgeName.current.value;
                     this.email= this.judgeEmail.current.value;
                     this.password = this.judgePassword.current.value;
                     this.categoryI = this.judgeCategoryI.current.value;
                     this.categoryII = this.judgeCategoryII.current.value;
                     console.log(this.name , this.email,this.password,this.categoryI,this.categoryII);
                     // this.props.onUpdateName(this.name);
                     // this.props.onUpdateEmail(this.email);
                     // this.props.onUpdatePassword(this.password);
                     // this.props.onUpdateCategoryI(this.categoryI);
                     // this.props.onUpdateCategoryII(this.categoryII);
                     this.state.data  =
                     {
                       name: this.name,
                       login_email: this.email,
                       password: this.password,
                       category_1:this.categoryI,
                       category_2 : this.categoryII,
                     }
                     console.log(this.state.data);
                     this.state.show_error = false;
                      this.props.onUpdateJudgeRegisterData(this.state.data)
                     this.props.onSubmitForm();
                    this.setState({submitError:''})   
          }

      render() {
        const {show, show_error} = this.state;
        console.log("show", show );
        console.log("show_error", show_error);
        const { response} = this.props;
        console.log("judge response", response);
        if(response)
        {
           if( (response.code === 400)||(response.code=== 422))
           {
             this.setState({message:response.message});
             this.setState({show :false});
             this.setState({show_error : true}); 
             this.setState({submitError:response.message})              
           }
           if(response.code=== 200)
           {
             console.log("indise new email " )
           this.setState({show:true });
           }
        }
        

        return (
          <article>
  
    <SweetAlert
	    
      show={this.state.show}
      title="Done"
      text="Judge Registration Successful"
      onConfirm={() => {
        window.location.replace("http://localhost:3000/judgelogin");
          this.setState({ show : false });}} />
        {!show&&<div>
        <br/><br/>
        <div >
        <center>
        <Title>
          Judge Registration
        </Title>
         <b>Name:</b>
         <b>   
           
            <Input type="text"  
                  required name="name" 
                  ref={this.judgeName}
                  onChange={this.handleNameInput} 
                  style={{border: '1px solid black'}} />
           
                  <h5>{this.state.errorName}</h5>
          </b><br/>
          <b>Email:</b>
                <b><Input type="email"  
                          required name="login_email" 
                          ref={this.judgeEmail}
                          onChange={this.handleEmailInput}
                          style={{border: '1px solid black'}} />
                          <h5>{this.state.errorEmail}</h5>
                </b><br/>
         <b>Password:</b>
                  <b><Input type="password"
                            required name="password"
                            ref={this.judgePassword}
                            onBlur={this.handlePasswordInput}
                            style={{border: '1px solid black'}} />
                            <h5>{this.state.errorPassword}</h5>
                  </b>
          <br/>
         <b>Category-I:</b><b> 
									<select  ref="category1"
                          autoComplete="off"
                          ref={this.judgeCategoryI}
                          defaultValue="-1"
                          style={{border: '1px solid black'}}        
                          required  >
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
                                    
                                        </select>
                                        <h5>{this.state.errorCategoryI}</h5>
		  </b><br/>
         <b>Category-II:</b><b>	<select
                                    name="category_2"
                                    autoComplete="off"
                                    ref={this.judgeCategoryII}
                                    defaultValue="-1"
                                    required
                                    style={{border: '1px solid black'}}
                                     >
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
                                    </select></b>
                                    
                                                          <br/><br/>
          <input type ='submit'
                        value='submit'
                        onClick={this.judgeRegister}
                        style={{border: '1px solid black'}}/>
                         <h2>{this.state.submitError}</h2>
   </center>  
   </div>                           
</div> 
        }
    
      </article>
    );
  }
}



export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadJudgeRegistration());
    },
    onUpdateJudgeRegisterData: data => {
      console.log("data in dispatch", data)
      dispatch(changeJudgeRegisterData(data))},   
  };
}

const mapStateToProps = createStructuredSelector({
  response: makeSelectJudgeResponse(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: LOCAL_JUDGE_STATE_NAME, reducer });
const withSaga = injectSaga({ key: LOCAL_JUDGE_STATE_NAME, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Judge_Registration);
