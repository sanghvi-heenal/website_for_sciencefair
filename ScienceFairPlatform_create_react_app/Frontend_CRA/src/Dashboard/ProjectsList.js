import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ProjectCard from './ProjectCard';

const styles = theme => ({
	root: {
		width: '100vw',
		justifyContent: 'center',
		flexDirection: 'row',
		padding: '20px',
	},
	grid: {},
	gridItem: {
		width: '200px',
		padding: theme.spacing.unit * 2,
		color: theme.palette.text.secondary,
	},
});

const ProjectsList = ({ judgeId, projects, submitResults, classes }) => {
	console.log("project list wala project_id" , projects);
	if  (projects.length) {
		return (
			<div className={classes.root}>
			<h6><center>Projects are now assigned to your dashboard,
				Please search for project based on project_id mentioned in the boxes below and enter the 
				scores once you judge each project
				 </center></h6>
				<Grid
					className={classes.grid}
					container
					justify="space-evenly"
					direction="row"
					spacing={16}
				>
					{projects.map(project => (
						<Grid
							justify="center"
							align="center"
							item
							xs={9}
							sm={2}
							md={3}
							lg={2}
							key={project._id}
						>
							<ProjectCard
								judgeId={judgeId}
								project={project}
								handleSubmitResults={submitResults}
							/>
						</Grid>
					))}
				</Grid>
			</div>
		);
	}

	return (
		<center>
			<br/>
			<h4>No projects have been assigned, please check with front desk</h4>
		</center>
	);
};

export default withStyles(styles)(ProjectsList);
