import React from 'react';
// import InputMask from 'react-input-mask';

class student_details extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			s_name1: props.getStore().s_name1,
			s_name2: props.getStore().s_name2,
			s_name3: props.getStore().s_name3,
			grade: props.getStore().grade,
			s_class: props.getStore().s_class,
			title: props.getStore().title,
			// sc_name2: props.getStore().sc_name2,
			// s_phone: props.getStore().s_phone,
			category: props.getStore().category,
		};
		// var retrievedObject = localStorage.getItem('testObject');
		// var data = JSON.parse(retrievedObject);
		// console.log('retrievedObject: ', data.f_name);
		this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

		this.validationCheck = this.validationCheck.bind(this);
		this.isValidated = this.isValidated.bind(this);
	}

	isValidated() {
		const userInput = this._grabUserInput(); // grab user entered vals
		const validateNewInput = this._validateData(userInput); // run the new input against the validator
		let isDataValid = false;
		
		// if full validation passes then save to store and pass as valid
		if (
			Object.keys(validateNewInput).every(k => {
				return validateNewInput[k] === true;
			})
		) {
			if (
				this.props.getStore().s_name1 != userInput.s_name1 ||
				this.props.getStore().grade != userInput.grade ||
				this.props.getStore().title != userInput.title ||
				this.props.getStore().category != userInput.category ||
				this.props.getStore().s_class != userInput.s_class
			) {
				// only update store of something changed
				this.props.updateStore({
					...userInput,
					savedToCloud: false, // use this to notify step4 that some changes took place and prompt the user to save again
				}); // Update store here (this is just an example, in reality you will do it via redux or flux)
			}

			isDataValid = true;
		} else {
			// if anything fails then update the UI validation state but NOT the UI Data State
			this.setState(
				Object.assign(
					userInput,
					validateNewInput,
					this._validationErrors(validateNewInput)
				)
			);
		}

		return isDataValid=true;
	}

	validationCheck() {
		if (!this._validateOnDemand) return;

		const userInput = this._grabUserInput(); // grab user entered vals
		const validateNewInput = this._validateData(userInput); // run the new input against the validator

		this.setState(
			Object.assign(
				userInput,
				validateNewInput,
				this._validationErrors(validateNewInput)
			)
		);
	}

	_validateData(data) {
		return {
			categoryVal: data.category != -1,
			s_name1Val: data.s_name1 != '', // required: anything besides N/A
			s_classVal: data.s_class != -1,
			gradeVal: data.grade != '',
			titleVal: data.title != '',

			// s_nameVal: (data.sc_name2 != ''),
		};
	}

	_validationErrors(val) {
		const errMsgs = {
			categoryValMsg: val.categoryVal
				? ''
				: 'A category selection is required',
			s_name1ValMsg: val.s_name1Val ? '' : 'Name is required',
			s_classValMsg: val.s_classVal ? '' : 'Class is required',
			gradeValMsg: val.gradeVal ? '' : 'Grade is required',
			titleValMsg: val.titleVal ? '' : 'Title is required',
			// s_nameValMsg: val.s_nameVal ? '' : 'School name is required'
		};
		return errMsgs;
	}

	_grabUserInput() {
		return {
			s_name1: this.refs.s_name1.value,
			s_name2: this.refs.s_name2.value,
			s_name3: this.refs.s_name3.value,
			grade: this.refs.grade.value,
			s_class: this.refs.s_class.value,
			title: this.refs.title.value,
			// sc_name2: this.refs.sc_name2.value,
			// s_phone: this.refs.s_phone.value,
			category: this.refs.category.value,
		};
	}

	render() {
		return (
			<div>
				<h2 align="center">Enter Student Details</h2>

				<table
					cellpadding="2"
					width="50%"
					border="10"
					cellspacing="4"
					align="center"
				>
					<tr>
						<td> Student(1) Name</td>
						<td>
							<div>
								<input
									ref="s_name1"
									autoComplete="off"
									type="text"
									placeholder="Name"
									className="form-control"
									required
									defaultValue={this.state.s_name1}
									onBlur={this.validationCheck}
								/>
								<div>{this.state.s_name1ValMsg}</div>
							</div>
						</td>
					</tr>
					<tr>
						<td>Gender </td>{' '}
						<td>
							{' '}
							<input type="radio" autoComplete="off" />M{' '}
							<input type="radio" autoComplete="off" />F
						</td>
					</tr>
					<tr>
						<td>Student(2) Name </td>
						<td>
							<div>
								<input
									ref="s_name2"
									autoComplete="off"
									type="text"
									placeholder="Name"
									className="form-control"
									required
									defaultValue={this.state.s_name2}
								/>
								{/* onBlur={this.validationCheck} 
                                <div>{this.state.s_name2ValMsg}</div> */}
							</div>
						</td>
					</tr>
					<tr>
						<td>Gender </td>{' '}
						<td>
							{' '}
							<input type="radio" autoComplete="off" />M{' '}
							<input type="radio" autoComplete="off" />F
						</td>
					</tr>
					<tr>
						<td>Student(3) Name </td>
						<td>
							<input
								ref="s_name3"
								autoComplete="off"
								type="text"
								placeholder="Name"
								className="form-control"
								required
								defaultValue={this.state.s_name3}
							/>
						</td>
					</tr>
					<tr>
						<td>Gender </td>{' '}
						<td>
							{' '}
							<input type="radio" autoComplete="off" />M{' '}
							<input type="radio" autoComplete="off" />F
						</td>
					</tr>
					<tr>
						<td>Student(S) Grade</td>
						<td>
							<div>
								<input
									ref="grade"
									autoComplete="off"
									type="text"
									placeholder="Name"
									className="form-control"
									required
									defaultValue={this.state.grade}
									onBlur={this.validationCheck}
								/>
								<div>{this.state.gradeValMsg}</div>
							</div>
						</td>
					</tr>
					<tr>
						<td>Select Class:</td>
						<td>
							<div>
								<select
									ref="s_class"
									className="form-control"
									required
									defaultValue={this.state.s_class}
									onBlur={this.validationCheck}
								>
									<option value="-1" selected>
										Select Grade
									</option>
									{/* <option value="small">Grades 1,2,3 (CLass I) </option> */}
									<option value="1">
										Grades 1,2,3 Class(I)
									</option>
									<option value="2">
										Grades 4,5,6 Class(II)
									</option>
								</select>
								<div>{this.state.s_classValMsg}</div>
							</div>
						</td>
					</tr>
					<tr>
						<td>Project TItle</td>
						<td>
							<div>
								<input
									ref="title"
									autoComplete="off"
									type="text"
									placeholder="Name"
									className="form-control"
									required
									defaultValue={this.state.title}
									onBlur={this.validationCheck}
								/>
								<div>{this.state.titleValMsg}</div>
							</div>
						</td>
					</tr>

					<tr>
						<td>Category </td>
						<td>
							<div>
								<select
									ref="category"
									autoComplete="off"
									className="form-control"
									required
									defaultValue={this.state.category}
									onBlur={this.validationCheck}
								>
									<option value="-1" selected>
										select..
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
								<div>{this.state.categoryValMsg}</div>
							</div>
						</td>
					</tr>

					{/* <tr>
                        <td>School Name</td>
                        <td>
                            <div>
                                <input
                                    ref="sc_name2"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="School Name"
                                    className="form-control"
                                    required
                                    defaultValue={this.state.sc_name2}
                                    onBlur={this.validationCheck} />
                                <div>{this.state.s_nameValMsg}</div>
                            </div>
                        </td>
                    </tr> */}
				</table>
			</div>
		);
	}
}

export default student_details;
