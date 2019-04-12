import React, { Component, Fragment } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import ProjectsList from './ProjectsList';

const styles = theme => ({
	progress: {
		margin: theme.spacing.unit * 2,
	},
});

class Dashboard extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		const retrievedObject = localStorage.getItem('judge');
		const j =  JSON.parse(retrievedObject);
		console.log("judge data from get item",j);
		this.state = {
			error: null,
			projects: null,
			isLoading: false,
			judge: j,
			
		};
	}

	componentDidMount() {
		console.log("in did mount");
		this._isMounted = true;
		this.setState({
			isLoading: true,
			error: null,
		});
		this.getProjects();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	submitResults =  async (projectId, judgeNumber, scores) => {
		console.log("in index getting results" , projectId, judgeNumber , scores);
		
		const results = {
			projectId :projectId,
			judgeNumber: judgeNumber,
			scores: scores,
		}
		//const res = await axios
			//.post(localStorage.getItem("MAIN_URL2")+'/api/project/score/', {
			const response = await fetch(localStorage.getItem("MAIN_URL2")+'/api/project/score', {
				method: 'POST',
				
				headers: {
					"Content-Type": "application/json"
				  },
				body: JSON.stringify(results),
			});
			console.log("res" , response);			
			const data = response.json();
			console.log("response json" , data);
			if(response){
				if (response.ok) 
				{
//############################# OLD METHOD ############################################
					// response.json().then(json => 
					// 	{
					// 	  console.log("json object" ,json);
					// 	  try{
					// 		if (json.status === 200) { 
					// 			//Update projects so that project will show up as already judged
					// 		this.getProjects();
					// 	}
					// 	else
					// 	{
					// 		console.log("unable to update the score");
					// 	}
					// 	}
					// 	catch(error) 
					// 	{
					// 		console.log("error occured", error);
					// 	}
					// });
//############################# WORKING METHOD ############################################
				try{
					if(response.status == 200)
					{
							console.log("response json" , response.status);
							this.getProjects();
					}
					else{
						console.log("unable to update the score");
					}
				}
				catch(error) 
					{
						console.log("error occured", error);
					}

					
				}
			}
	};

	getProjects = () => {
		const { judge } = this.state;

		axios
			.get(localStorage.getItem("MAIN_URL2")+'/api/judge/projects/', {
				params: {
					judgeId: judge._id,
				},
			})
			.then(res => {
				const { data, status } = res;
				console.log(data);
				if (this._isMounted) {
					this.setState({
						error: status !== 200 ? 'Bad Server Response' : null,
						projects: data.projects,
						isLoading: false,
					});
				}
			})
			.catch(error => {
				console.log(error);
				if (this._isMounted) {
					this.setState({
						error,
						isLoading: false,
					});
				}
			});
	};

	handleLogout = () =>
	{
		localStorage.setItem('judge', null);
		window.location.replace(localStorage.getItem("MAIN_URL1")+"/judgedashboard");
	}

	render() {
		const { isLoading, error, projects , judge  } = this.state; //diff b/w state defination and this
		const { classes } = this.props;
		// const retrievedObject = localStorage.getItem('judge');
		// const judge =  JSON.parse(retrievedObject);
		// console.log("judge data from get item",judge);
		console.log('name of judge', judge.name);
		return (
			<Fragment>
				<center>
					{console.log("welcome")}
					<h3>Welcome, {judge.name || 'Judge'} </h3>
					{isLoading && (
						<CircularProgress
							disableShrink
							className={classes.progress}
						/>
					)}
					{error && <p>Error</p>}
				</center>
				{!(isLoading || error) && projects && (
					<ProjectsList
						judgeId={judge._id}
						submitResults={this.submitResults}
						projects={projects}
					
						
					/>
				)}<br/>
				<center>
				<button onClick ={this.handleLogout}>Sign Out</button>
				</center>
			</Fragment>
		);
	}
}

export default withStyles(styles)(Dashboard);
