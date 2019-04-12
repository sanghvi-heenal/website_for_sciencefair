import React from 'react';
import axios from 'axios';
class Specific_u extends React.Component {
    constructor(props) {
        super(props);
       this.handleSave = this.handleSave.bind(this);
       this.handleDoc = this.handleDoc.bind(this);
        this.state = {
            summary: props.getStore().summary,
			summary_doc:'',
			form_doc:'',
			// valid_check:false
        };
    
        this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    
        this.validationCheck = this.validationCheck.bind(this);
        this.isValidated = this.isValidated.bind(this);
    }
	
     async handleSave(event) {
		event.preventDefault();
		const form = event.target;
		const data = new FormData(form);
       
		// post data to save
    
        
    const result= await fetch(localStorage.getItem("MAIN_URL2")+'/api/user/uploaddoc', {
      method: 'POST',
      body: data,
    });
    alert("Project Summary Document uploaded");
    
    
    // .then(response =>  response.json())
    // .then(resData=> {
		
	   
    //    this.setState({summary_doc: resData.file,valid_check:true}); //this is an asynchronous function
    this.setState({summary_doc: result.file},()=>{

        console.log("Set State Callback ",this.state)
    });
        //})
       

        
    }
    async handleDoc(event) {
		event.preventDefault();
		const form = event.target;
		const data = new FormData(form);
       
		// post data to save
    const result = await fetch(localStorage.getItem("MAIN_URL2")+'/api/judge/uploadform', {
      method: 'POST',
      body: data,
    });
    alert("document uploaaded");
    // .then(response =>  response.json())
    // .then(resData => {

       this.setState({form_doc: result.file},()=>{

        console.log("Set State Callback ",this.state)
    }); //this is an asynchronous function
   // })
        
    }
    isValidated() {
        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
        let isDataValid = false;
      // let valid_check=this.state.valid_check;
	//    if(valid_check==true)
	// 		{
	// 			isDataValid = true;
	// 		}
	// 		else
	 		//{
			      // if full validation passes then save to store and pass as valid
				if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
					if (userInput.summary.length >= 100 || userInput.summary.length <= 7000 ) {    //|| valid_check==false

						if (this.props.getStore().summary != userInput.summary) { // only update store of something changed
							this.props.updateStore({
							...userInput,
							savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
							});  // Update store here (this is just an example, 
						}

						isDataValid = true;
					}
					
						}
				else {
					// if anything fails then update the UI validation state but NOT the UI Data State
					this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
				}	
			//}
     
    
        return isDataValid=true;
      }
    
      validationCheck() {
        if (!this._validateOnDemand)
          return;
    
        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
    
        this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
      }
    
       _validateData(data) {
        return  {
            // summaryVal: (data.summary != '')
        }
      }
    
      _validationErrors(val) {
          let msg = '';
            let valid_check=this.state.valid_check;
			// alert(valid_check);
          if (val.summaryVal == '' ) {  //|| valid_check==false
            msg = 'A summary is required, either Type in the Textarea or upload it below';
          } else if ((val.summaryVal < 100 || val.summaryVal > 1000) ) {    //&& valid_check==false
            msg = "Summary should be 100 to 7000 characters";
          }

            const errMsgs = {
            summaryValMsg: msg
            }
        return errMsgs;
      }
    
      _grabUserInput() {
        return {
            summary: this.refs.summary.value,
            summary_doc: this.refs.summary_doc.value,
            form_doc: this.refs.form_doc.value,
			
        };
      }

      calcWritedNum (e) {
          this.setState({writedSpellNum: e.target.value.length});
      }

    render() {
        return (
            <div>
                <div class="page1"><table align="center">
                    <br />
                    <tr><td><br /> <font size="6"><b>Project Requirements</b></font></td></tr>
                    <tr><td><font size="5">Maximum display dimensions are as follows:</font></td></tr>
                   <tr><td> <ui><li>76 cm (30 in) deep</li>
        <li>122 cm (48 in) wide</li>
        <li>274 cm (108 in) high, including the table height. Table height should not exceed 91cm 
            (36 in).</li>
        <li>An Institutional Review Board (IRB) MUST review and approve all projects dealing with
            human subjects BEFORE experimentation begins.</li>
        <li>IRB signatures are required on Form 4A, in addition to the SRC signature on Form 1B. 
          When students conduct questionnaires, the students, their parents, and the school are 
          responsible for protecting the rights and welfare of the participating human subjects.</li>
        <li> The school MUST monitor administration of all questionnaires; seeing that all legal 
            requirements are met and that informed consent forms are used for any subjects less 
            than 18 years of age.</li>
        <li>All informed consent forms (Form 4B) MUST be available with the project during judging.
            Form 4B MUST be attached to the registration with all other required forms. -- DO NOT SEND
            THE COMPLETED QUESTIONNAIRES TO THE MSEF OFFICE. However, they must be made available 
            during the judging process.</li>
        <li>Specific federal laws that attention should be paid to are as follows: 1) CFR, 
            Title 45(Public Welfare), Part 47-Protection of Human Subjects (45cfr47); 2) CFR, 
            Title 45(Public Welfare) Part 5-Privacy Act Regulations (45CFR5b); and 3) Public Health 
            Service Act 42 USC, S 241 (d) (Protection of Privacy of Individuals who are Research Subjects).
          These documents are available from the Office of Protection from Research Risks, National 
          Institutes of Health, Bldg 31 Room 5B63, 9000 Rockville Pike, Bethesda, MD 20892</li>

    </ui></td></tr>

                    <tr><td><br /> <font size="6"><b> Project summary</b></font></td></tr>
                    <tr><td >
                        At least 5 sentences; you may type the summary</td></tr>
                    <tr><td>in the box or upload a scan below.</td></tr>

                    <tr><td><br /> <div>
                                <textarea
                                    rows="5" 
                                    cols="50"
                                    ref="summary"
                                    autoComplete="off"
                                    className="form-control"
                                    defaultValue={this.state.summary}
                                    onChange={(event) => this.calcWritedNum(event)} 
                                    onBlur={this.validationCheck}></textarea>
                                <div style={{marginTop: "10px", marginBottom: "20px", 
                                     paddingLeft: "60%"}}>
                                     {this.state.writedSpellNum} characters</div>
                                <div>{this.state.summaryValMsg}</div>
                            </div></td></tr>
                 
                  <tr><td><br /><br/><font size='5'><b>Project Summary Upload</b></font></td></tr>
                    <tr><td>
					  <form onSubmit={this.handleSave}>
          <input id="a"   
                name="summarydoc" 
                type="file"  />
          <input type="hidden" 
                 ref="" 
                 name="upload_type" 
                 value="summery"/>
					<button><font size='3'> Upload Summary</font></button>
					</form>

          <input type="hidden" 
                 ref="summary_doc" 
                 defaultValue={this.state.summary_doc} 
                 name="summer_doc"/>
					</td></tr>  
                </table>
                </div>

                <div class="page1">
                    <table style={{ paddingRight: "50px" }} align="center">


                        <tr><td><br /><font size="6"><b>Form Submission(Optional for Lower Fair)</b></font></td></tr>
                        <tr><td><font size="4">(Upload any Specialty Forms as needed.Optional for Lower Fair)</font></td></tr>
                        <tr><td>All Competitors must upload documents online (preferred) or by email, 
                          by post or fax the forms 1, 1A and 1B before being allowed to compete. </td></tr>
                        <tr><td>USE THIS LINK TO DETERMINE WHICH ADDITIONAL FORMS YOU MAY NEED :  
            <a href="https://apps2.societyforscience.org/wizard/index.asp">
                   https://apps2.societyforscience.org/wizard/index.asp
            </a>.
            <br/> Students who do not follow the rules or provide the applicable forms will be 
                         disqualified.</td></tr>
                        <tr>
                            <td>
                                <ui>
                               <li> Regulated Research Institutional/Industrial Setting Form (1C)</li>
                               <li> Qualified Scientist Form (2)</li>
                               <li> Risk Assessment Form (3)</li>
                               <li> Human Participants Form (4)</li>
                               <li> Vertebrate Animal Form (5A)</li>
                               <li> Vertebrate Animals Form (5B)</li>
                               <li> Potentially Hazardous Biological Agents Risk Assessment (6A) </li>
                               <li> Human & Vertebrate Animal Tissue Form (6B) </li>
                               <li> Continuation Projects Form (7) </li>
                                </ui>
            
            
            
            
            
                </td></tr>
                        <tr><td><br />
						  <form onSubmit={this.handleDoc}>
					<input id="a"   name="formdoc" type="file"/>
					
						<button><font size='3'> Upload Form </font></button>
					</form>   
					<input type="hidden" ref="form_doc" defaultValue={this.state.form_doc} name="form_doc"/>   
					
						</td></tr>

                    </table>
                </div>
            </div>
        );
    }
}
export default Specific_u;