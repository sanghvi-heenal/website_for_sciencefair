/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link ,Redirect ,withRouter } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../Dashboard';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';


class Judgedashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
			//judge:null,
			show_error: false,
			login_email: '',
			login_password: '',
			show:false,
		};

		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getJudgeData = async judgeData => {
		// console.log('getJudgeData: ', judgeData);
		try {
			console.log("judgeData" , judgeData);
			const response = await axios.post(
				localStorage.getItem("MAIN_URL2")+'/api/judge/login',
				judgeData
			);

			const { data } = response;
			// console.log('data code', data.code);
			if (data.code === 200 || data.status === true) {
				console.log('data object', data.judgedetails);
				localStorage.setItem('judge', JSON.stringify(data.judgedetails));
				return data.judgedetails;
			}
			console.log('404 found', data.message);
			this.setState({ show_error: true });
			return null;
		} catch (error) {
			console.log('error');
			this.setState({ show_error: true });
			return null;
		}
	};

	handleChangeEmail(event) {
		
		this.setState({ login_email: event.target.value });
	}

	handleChangePassword(event) {
		this.setState({ login_password: event.target.value });
	}

	async handleSubmit(event) {

		event.preventDefault();
		const { login_email, login_password } = this.state;
		const { handleLogin } = this.props;
		const judgeData_1 =  await this.getJudgeData({
			login_email,
			login_password,
		});
		if (judgeData_1) {
			
			console.log("data_1" , judgeData_1)
			const retrievedObject = localStorage.getItem('judge');
			console.log("retrieved object" , JSON.parse(retrievedObject));
			const judgeData =  JSON.parse(retrievedObject);
			console.log("judge data from get item",judgeData);
			this.setState({judge:judgeData})
			this.setState({show: true})
			this.props.history.push('/judgedashboard')
		
		}
	}

	render() {
		const { login_email, login_password , show  } = this.state;
		const retrievedObject = localStorage.getItem('judge');
		console.log("retrieved object" , JSON.parse(retrievedObject));
			const judge =  JSON.parse(retrievedObject);
			console.log("judge data from get item",judge);
		// const { judge } = this.props;
		//console.log('Render -> Judge Data:', judge);
		return (
			<React.Fragment>
			<SweetAlert
					show={this.state.show_error}
					title="Error"
					className="red-bg"
					text="Invalid Login Detail"
					onConfirm={() => {
						//this.props.history.push('/')
						window.location.replace(localStorage.getItem("MAIN_URL1")+"/judgedashboard");
						this.setState({ show_error: false });
					}}
				/>
					{judge && <Dashboard/>}
			
					{!judge && 
					<div>
						<Modal isOpen={!judge}>
							<form onSubmit={this.handleSubmit}>
								<ModalHeader>Judge Login</ModalHeader>
								<ModalBody>
									<div className="row">
										<div className="form-group col-md-6">
											<label>Email:</label>
											<input
												type="email"
												required
												name="login_email"
												value={login_email}
												onChange={
													this.handleChangeEmail
												}
												className="form-control"
											/>
										</div>
									</div>
									<div className="row">
										<div className="form-group col-md-6">
											<label>Password:</label>
											<input
												type="password"
												required
												name="login_password"
												value={login_password}
												onChange={
													this.handleChangePassword
												}
												className="form-control"
											/>
										</div>
									</div>
									<div className="row">
										<div className="form-group col-md-6">
											<Link
												to="/judgeregister"
												onClick={this.toggle}
											>
												Want to Judge? Register Here
											</Link>
											<br />
											<Link
												to="/judgeforgot"
												onClick={this.toggle}
											>
												Forgot Password ??
											</Link>
										</div>
									</div>
								</ModalBody>
								<ModalFooter>
									<input
										type="submit"
										value="Login"
										color="primary"
										className="btn btn-primary"
									/>
									<Link to="/">
										<Button color="danger">Cancel</Button>
									</Link>
								</ModalFooter>
							</form>
						</Modal>
					</div>
					}
				
			</React.Fragment>
		);
	}
}

export default withRouter(Judgedashboard);
