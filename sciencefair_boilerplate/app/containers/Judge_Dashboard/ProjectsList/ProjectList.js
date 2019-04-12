import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProjectCard from '../ProjectCard';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter , Redirect } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectUpdateProjects, makeSelectUpdateJudge} from '../selectors';
import { loadJudgeDashboard } from '../../App/actions';
import {LOCAL_DASHBOARD_STATE} from '../constants';
import reducer from '../reducer';
import saga from '../saga'


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
const ProjectsList =  (props) =>
{	


	
	//console.log("projects in projectlist",props.projects );
	const {  classes , judge_id , submitResults,} = props;
	console.log("projects object" ,props.projects );
	const {projects} = props.projects;
	console.log("inside projects", projects);
	console.log("list judge_id", judge_id);
	if(projects){
	if (projects.length>0) {
		return (
			<div className={classes.root}>
				<Grid
					className={classes.grid}
					container
					justify="space-evenly"
					direction="row"
					spacing={16}
				>
					{Object.values(projects).map( project => 
						(
						
						<Grid
							justify="center"
							container={true}
							align="center"
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={project._id}
						>
							<ProjectCard
								//judgeId={props.judge_id}
								project={project}
								handleSubmitResults={submitResults}
							/>
						</Grid>
					))} 
					
				</Grid>
			</div>
		);
	}
}
	 

return (<center>
	<br/>
	<h4>No projects have been assigned, please check with front desk</h4>
</center>);

	
};
export function mapDispatchToProps(dispatch) {
    return {
      // onSubmitJudgeDashboard: evt => {
      //   console.log("event value in login" , evt);
      //   if (evt !== undefined &&  evt.preventDefault) evt.preventDefault();
      //   dispatch(loadJudgeDashboard());
      // },
    };
  }
  
  const mapStateToProps = createStructuredSelector({
		projects: makeSelectUpdateProjects(),
		judge_id: makeSelectUpdateJudge(),
  });

  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  const withReducer = injectReducer({ key: LOCAL_DASHBOARD_STATE, reducer });
  //const withSaga = injectSaga({ key: LOCAL_DASHBOARD_STATE, saga });
  
  export default compose(
	withStyles(styles),
	withReducer,
    //withSaga,
    withConnect,
  )(ProjectsList);
//export default withStyles(styles)(ProjectsList);