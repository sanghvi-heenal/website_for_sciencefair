import React from 'react';
import InputMask from 'react-input-mask';
import './look.css';


class teacher_reg extends React.Component
{
    constructor(props) {
        super(props);
        // const retrievedObject = localStorage.getItem('testObject');
        // const data =  JSON.parse(retrievedObject);
		// console.log('retrievedObject in teacher: ',data);
        this.state = {
            // f_name: data.f_name,
            // l_name: data.l_name,
            // t_email: data.t_email,
            // sc_name1: data.sc_name1,
            // s_phone: data.s_phone
            f_name: props.getStore().f_name,
            l_name: props.getStore().l_name,
            t_email: props.getStore().t_email,
            sc_name1: props.getStore().sc_name1,
            s_phone: props.getStore().s_phone
        };
        
    
        this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    
        this.validationCheck = this.validationCheck.bind(this);
        this.isValidated = this.isValidated.bind(this);
    }

   



    isValidated() {
        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
        let isDataValid = false;
    
        // if full validation passes then save to store and pass as valid
        if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
            if (this.props.getStore().f_name != userInput.f_name || this.props.getStore().l_name != userInput.l_name || this.props.getStore().sc_name1 != userInput.sc_name1 || this.props.getStore().emailVal != userInput.emailVal || this.props.getStore().s_phone != userInput.s_phone) { // only update store of something changed
                this.props.updateStore({
                  ...userInput,
                  savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
                });  // Update store here 
            }

            isDataValid = true;
        }
        else {
            // if anything fails then update the UI validation state but NOT the UI Data State
            this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
        }
    
        return isDataValid=true;
      }



    
      validationCheck() {
        if (!this._validateOnDemand)
          return;
    
        const userInput = this._grabUserInput(); // grab user entered vals
        //console.log("useInput in check" , userInput);
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
    
        this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
      }


    
       _validateData(data) {
           //console.log("data in validated data" , data);
        return  {
            f_nameVal: (data.f_name != ''), // required: anything besides N/A
            l_nameVal: (data.l_name != ''), // required: anything besides N/A
            s_nameVal: (data.sc_name1 != ''),
            emailVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.t_email), // required: regex w3c uses in html5
            s_phone: (data.s_phone!= ''),
        }
      }



    
      _validationErrors(val) {
        const errMsgs = {
          f_nameValMsg: val.f_nameVal ? '' : 'First name is required',
          l_nameValMsg: val.l_nameVal ? '' : 'Last name is required',
          s_nameValMsg: val.s_nameVal ? '' : 'A school name is required',
          emailValMsg: val.emailVal ?   '' : 'A valid email is required',
          phoneValMsg: val.s_phoneVal ? '' : 'A valid phone number is required',
        }
        return errMsgs;
      }




    
      _grabUserInput() {
        return {
            f_name: this.refs.f_name.value,
            l_name: this.refs.l_name.value,
            t_email: this.refs.t_email.value,
            sc_name1: this.refs.sc_name1.value,
            s_phone : this.refs.s_phone.value,
        };
      }



    render()
    {
        return(
            <div>
                <h2 align="center" ><b>Adult Sponsor/Teacher</b></h2>

                <table cellpadding="2" width="50%" border="3" cellspacing="4" align="center">
                    <tr></tr>
                    <tr> <td>Name </td>
                        <td>
                            <div>
                                <input
                                 
                                    ref="f_name"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="First Name"
                                    className="form-control"
                                    required
                                    defaultValue={this.state.f_name}
                                    onBlur={this.validationCheck} />
                                <div>{this.state.f_nameValMsg}</div>
                            </div>
                        </td>
                        <td>
                            <div>
                                <input 
                                    
                                    ref="l_name"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Last Name"
                                    className="form-control"
                                    required
                                    defaultValue={this.state.l_name}
                                    onBlur={this.validationCheck} />
                                <div>{this.state.l_nameValMsg}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>First</td>
                        <td>Last</td>
                    </tr>
                    <tr>
                        <td>Adult Sponsor/Teacher Email</td>
                        <td>
                            <div>
                                <input
                                    ref="t_email"
                                    autoComplete="off"
                                    type="email"
                                    placeholder="john.smith@example.com"
                                    className="form-control"
                                    required
                                    defaultValue={this.state.t_email}
                                    onBlur={this.validationCheck} />
                                <div>{this.state.emailValMsg}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>School Name</td>
                        <td>
                            <div>
                                <input
                                    ref="sc_name1"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="School Name"
                                    className="form-control"
                                    required
                                    defaultValue={this.state.sc_name1}
                                    onBlur={this.validationCheck} />
                                <div>{this.state.s_nameValMsg}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>School Phone</td>
                        <td>
                            <InputMask   ref="s_phone"  className="form-control"  defaultValue={this.state.s_phone}  mask="999-999-9999" onBlur={this.validationCheck} />
                                <div>{this.state.s_nameValMsg}</div> 
                        </td>
                    </tr>
                </table>
            </div>  
        );
    }
}

export default teacher_reg;