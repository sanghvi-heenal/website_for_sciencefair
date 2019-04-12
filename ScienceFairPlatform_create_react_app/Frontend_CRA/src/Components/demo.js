import React from 'react';


class shirt_size2 extends React.Component
{
    constructor(props) {
        super(props);
    
        this.state = {
            shirt_sizes: '',
			size_data:''
        };

        this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    
        this.validationCheck = this.validationCheck.bind(this);
        this.isValidated = this.isValidated.bind(this);
    }

    handleCheck(index,value) {
		alert(value);
        // this.state.shirt_sizes[index].checked = !this.state.shirt_sizes[index].checked;
        this.state.size_data = value;
    }

    isValidated() {
        let isDataValid = false;

        for (var i = 0; i < 17; i ++) {
            if (this.state.shirt_sizes[i].checked) {
                isDataValid = true;
                break;
            }   
        }

        const userInput = {shirt_sizes_2: this.state.shirt_sizes};

        this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
        });

        const validateNewInput = this._validateData(userInput); // run the new input against the validator
        
        if (!isDataValid)
            this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    
        return isDataValid;
    }

    validationCheck() {
        if (!this._validateOnDemand)
          return;
    
        const userInput = {shirt_sizes_2: this.state.shirt_sizes,size_data:this.state.size_data}; // grab user entered vals
		console.log(userInput);
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
    
        this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    }

    _validationErrors(val) {
        const errMsgs = {
          sizeMsg: val.shirt_sizeVal ? '' : 'At least 1 check'
        }
        return errMsgs;
    }

    _validateData(data) {
        let flag = false;

        for (var i = 0; i < 17; i ++) {
            if (data.shirt_sizes_2[i].checked) {
                flag = true;
                break;
            }   
        }
        return  {
            shirt_sizeVal: flag
        }
    }
    
    render()
    {
        return(
            <div>
                <h1 align="center"> Please indicate the shirt size if you are preordering a t-shirt  for Student2</h1>
                    <table cellpadding="1" width="20%" cellspacing="2" align="center">
                    <tr>
                        <td align="left">
                            <div>{this.state.sizeMsg}</div>
                        </td>
                    </tr>
                <tr>
                <td align="left">
                <input type="radio" name="size_1" onChange={this.handleCheck.bind(this, 0,'Youth Small-Tennessee Gold')} /><font size="3">  Youth Small-Tennessee Gold </font>
                </td>

                </tr>
                <tr>
                <td align="left">
                <input type="radio" name="size_1" onChange={this.handleCheck.bind(this, 1,'Youth Small-Super Black')}/><font size="3"> Youth Small-Super  </font>
                </td>

                </tr>
                <tr>
                <td align="left">
                <input type="radio" name="size_1" onChange={this.handleCheck.bind(this, 2,'Youth Small-Tennessee Gold')} /><font size="3">  Youth Small-Tennessee Gold </font>
                </td>

                </tr>

             
                    <tr>
                <td colspan="1" align="left"><input type="text" name="ifnotanyfromabove"
                id="ifnotanyfromabove" size="30"/></td>
                </tr>
                </table>
            </div>
        );

    }
}
export default shirt_size2;