import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { Route, Link, Switch } from 'react-router-dom';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies

import logo from './usm.png';
import './App.css';

import Homepage from './Components/homepage';
import typeoffair from './Components/Typeoffair';
import form_instructions from './Components/Form_Instructions';
import u_sform from './Components/U_sform';
import demo from './Components/demo';
import judgeregister from './Components/judgeregister';
import judgeforgot from './Components/judgeforgot';
import Judgedashboard from './Components/judgedashboard';
import dashboard from './Dashboard';
import registeruser from './Components/registeruser';
import registered from './Components/Registered';
import queries from './Components/Queries';
import trial from './Components/trial';
import admin_login from './Admin_Operations/Admin_Login';
import rank from './Admin_Operations/Ranks';
import admin from './Admin_Operations';
import image1 from './Images/image2.jpg';
import queries_sent from './Components/Queries_sent';
import 'sweetalert/dist/sweetalert.css';

class App extends Component {
	constructor(props) {
		super(props);
		//localStorage.setItem('judge', null);
		//const ject = localStorage.getItem('judge');
		//	const getJudge = JSON.parse(ject);
			//console.log("in appjs" ,getJudge);
		this.state = {
			judge: null,
			show_error: false,
		};
		 // localStorage.setItem("MAIN_URL","http://sciencefair1.usm.edu:3000");
    	 localStorage.setItem("MAIN_URL1","http://localhost:3000");
		localStorage.setItem("MAIN_URL2","http://localhost:4000");
		localStorage.setItem("admin" , false);
	  // localStorage.setItem("MAIN_URL","https://sciencefair1.usm.edu");
	   //  fetch(localStorage.getItem("MAIN_URL")+'/api/judge/login'
	}

	handleLogin = async judgeData => {
		console.log("judgedata in app" , judgeData)
		const judge = await judgeData;

		console.log('App.js -> handleLogin called:', judge);

		this.setState({
			judge,
		});
	};

	handleLogout = () => {
		this.setState({
			judge: null,
		});
	};

	goHome = () => {
		window.location.assign(localStorage.getItem("MAIN_URL1"));
	};

	render() {
		return (
			// <Router history={history}>

			<div className="App">
			

				<header className="App-header">
					<center>
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">
							{' '}
							University of Southern Mississippi Region-I Science
							and Engineering Fair
						</h1>
						<a href="https://www.usm.edu/science-math-education">
							Center of Science and Math Education
						</a>
					</center>
				</header>

				<Parallax
					className="Appbody"
					blur={7}
					bgImage={image1}
					strength={500}
				>
					<Nav-bar>
						<ul id="tabs">
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/fairs"> Student Registration</Link>
							</li>
							<li>
								<Link to="/queries">ContactUs</Link>
							</li>
							<li>
								<Link to="/judgedashboard">
									Judge Login
								</Link>
							</li>
							<li>
								<Link to="/admin_login"> Admin</Link>
								</li>
						</ul>
					</Nav-bar>

					<Switch>
						<Route path="/rank" component={rank}/>
						<Route path="/trial" component={trial}/>
						<Route path="/admin" component={admin}/>
						<Route path="/queries_sent" component={queries_sent} />
						<Route path="/queries" component={queries} />
						<Route path="/uform" component={u_sform} />
						<Route path="/demo" component={demo} />
						<Route
							exact
							path="/judgeregister"
							component={judgeregister}
						/>
						<Route path="/judgeforgot" component={judgeforgot} />

						<Route
							path="/judgedashboard"
							component={Judgedashboard}
						/>
						<Route path="/admin_login"
								component ={admin_login}/>
						<Route path="/dashboard" component={dashboard} />
						<Route path="/registeruser" component={registeruser} />
						<Route path="/registered" component={registered}/>
						<Route path="/instructions" component={form_instructions} />
						<Route path="/fairs" component={typeoffair} />
						<Route exact path="/" component={Homepage} />
					</Switch>
					<div>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />{' '}
						<center>
							<p size="3">
								The University of Southern Mississippi | 118
								College Drive, Hattiesburg, MS 39406-0001 |
								601.266.4379{' '}
							</p>
							<p>
								© 2019 The University of Southern Mississippi.
								All rights reserved.
							</p>
						</center>
					</div>
				</Parallax>
			</div>
			// </Router>
		);
	}
}

export default App;
