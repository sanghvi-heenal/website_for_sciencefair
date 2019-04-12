import React from 'react';


class shirt_size3 extends React.Component
{
    constructor(props) {
        super(props);
    
        this.state = {
            shirt_sizes: props.getStore().shirt_sizes_3,
			size_data_3:'',
        };

        this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    
        this.validationCheck = this.validationCheck.bind(this);
        this.isValidated = this.isValidated.bind(this);
    }

    handleCheck(index,value) {
        this.state.shirt_sizes[index].checked = !this.state.shirt_sizes[index].checked;
		this.state.size_data_3=value;
    }    

    isValidated() {
        let isDataValid = false;

        for (var i = 0; i < 21; i ++) {
            if (this.state.shirt_sizes[i].checked) {
                isDataValid = true;
                break;
            }   
        }

        const userInput = {shirt_sizes_3: this.state.shirt_sizes,size_data_3:this.state.size_data_3};
        console.log(userInput);
        this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
        });

        const validateNewInput = this._validateData(userInput); // run the new input against the validator
        
        if (!isDataValid)
            this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    
        return isDataValid=true;
    }

    validationCheck() {
        if (!this._validateOnDemand)
          return;
    
        const userInput = {shirt_sizes_3: this.state.shirt_sizes,size_data:this.state.size_data}; // grab user entered vals
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
        let flag = true;

        for (var i = 0; i < 21; i ++) {
            if (data.shirt_sizes_3[i].checked) {
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
                <h1 align="center"> Please indicate the shirt size if you are preordering a t-shirt  for Student3</h1>
                <h3 allign="center">(Select None if you do not wish to preorder or if less than three students)</h3>
                      <table cellpadding="1" width="20%" cellspacing="2" align="center">
                    <tr>
                        <td align="left">
                            <div>{this.state.sizeMsg}</div>
                        </td>
                    </tr>
                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 0,'Youth Small- Gold')} defaultChecked={this.state.shirt_sizes[0].checked}/><font size="3">  Youth Small- Gold </font>
                </td>

                </tr>
                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 1,'Youth Small-Super black')} defaultChecked={this.state.shirt_sizes[1].checked}/><font size="3"> Youth Small-Super black </font>
                </td>

                </tr>
                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 2,'Youth Small- Gold')} defaultChecked={this.state.shirt_sizes[2].checked}/><font size="3">  Youth Small- Gold </font>
                </td>

                </tr>

                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 3,'Youth Medium-Super black')} defaultChecked={this.state.shirt_sizes[3].checked}/><font size="3">  Youth Medium-Super black </font>
                </td>

                </tr>
                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 4,'Youth Large- Gold')} defaultChecked={this.state.shirt_sizes[4].checked}/><font size="3">  Youth Large- Gold </font>
                </td>

                </tr>
                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 5,'Youth Large-Super black ')} defaultChecked={this.state.shirt_sizes[5].checked}/><font size="3"> Youth Large-Super black </font>
                </td>

                </tr>

                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 6,'Youth Extra Large- Gold')} defaultChecked={this.state.shirt_sizes[6].checked}/><font size="3">Youth Extra Large- Gold</font>
                </td>

                </tr>
                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 7,'Youth Extra Large-Super Blu')} defaultChecked={this.state.shirt_sizes[7].checked}/><font size="3"> Youth Extra Large-Super black </font>
                </td>

                </tr>
                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 8,'Small- Gold')} defaultChecked={this.state.shirt_sizes[8].checked}/><font size="3"> Small- Gold </font>
                </td>

                </tr>

                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 9,'Small-Super black')} defaultChecked={this.state.shirt_sizes[9].checked}/><font size="3"> Small-Super black </font>
                </td>

                </tr>

                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 10,'Medium- Gold')} defaultChecked={this.state.shirt_sizes[10].checked} /><font size="3"> Medium- Gold</font>
                </td>

                </tr>

                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 11,'Medium-Super black')} defaultChecked={this.state.shirt_sizes[11].checked} /><font size="3">Medium-Super black </font>
                </td>

                </tr>

                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 12,'Large- Gold')} defaultChecked={this.state.shirt_sizes[12].checked} /><font size="3">Large- Gold </font>
                </td>

                </tr>
                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 13,'Large-Super black')} defaultChecked={this.state.shirt_sizes[13].checked} /><font size="3">Large-Super black </font>
                </td>

                </tr>
                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 14,'Extra Large- Gold')} defaultChecked={this.state.shirt_sizes[14].checked} /><font size="3">Extra Large- Gold </font>

                </td>

                </tr>

                <tr>
                <td align="left">
                <input type="radio" onChange={this.handleCheck.bind(this, 15,'Extra Large-Super black')} defaultChecked={this.state.shirt_sizes[15].checked} /><font size="3">Extra Large-Super black </font>
                </td>
                </tr>
                <tr>
                <td align="left">
                <input type="radio" 
                        onChange={this.handleCheck.bind(this, 16,'2XL-Gold')} 
                        defaultChecked={this.state.shirt_sizes[16].checked} /><font size="3">2XL-Gold</font>

                </td>   </tr>
                <tr>
                <td align="left">
                <input type="radio" 
                        onChange={this.handleCheck.bind(this, 17,'2XL-Super black')} 
                        defaultChecked={this.state.shirt_sizes[17].checked} /><font size="3">2XL-Super black</font>
                </td>   </tr>
                <tr>
                <td align="left">
                <input  type="radio" 
                        onChange={this.handleCheck.bind(this, 18,'3XL-Gold')} 
                        defaultChecked={this.state.shirt_sizes[18].checked} /><font size="3">3XL-Gold</font>
                </td>   </tr>
                <tr>
                <td align="left">
                <input type="radio" 
                        onChange={this.handleCheck.bind(this, 19,'3XL-Super black')} 
                        defaultChecked={this.state.shirt_sizes[19].checked} /><font size="3">3XL-Super black</font>

                </td>   </tr>
                <tr>
                <td align="left">
                <input type="radio" 
                    onChange={this.handleCheck.bind(this, 20,'None')} 
                    defaultChecked={this.state.shirt_sizes[20].checked} /><font size="3">None</font>

                </td>
                </tr>
                <tr><td><font size="3">Indicate t-shirt size for Student(3)</font></td></tr>
                    {/* <tr>
                <td colspan="1" align="left"><input type="text" name="ifnotanyfromabove"
                id="ifnotanyfromabove" size="30"/></td>
                </tr> */}
                </table>
            </div>
        );

    }
}
export default shirt_size3;