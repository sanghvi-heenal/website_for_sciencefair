import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter , Redirect } from 'react-router-dom';
import { loadJudgeResult } from '../../App/actions';
import {LOCAL_DASHBOARD_STATE} from '../constants';
import H2 from '../../../components/H2';
import AtPrefix from '../AtPrefix';
import CenteredSection from '../CenteredSection';
import Form from '../Form';
import Input from '../Input';
import Section from '../Section';
import messages from '../messages';
import {updateJudgeResult} from '../actions';
import { makeSelectUpdateProjects, makeSelectUpdateJudge} from '../selectors';
import JudgeFormModal from '../JudgeFormModal';
import reducer from '../reducer';
import saga from '../saga';


const styles = {
	card: {
		maxWidth: 400,
	},
	cardHeader: {
		height: '100px',
		textAlign: 'center',
	},
	cardActions: {
		height: '50px',
		justifyContent: 'center',
	},
};

const classes = [
	'',
	'Grades 1,2,3 (Class I)',
	'Grades 4,5,6 (Class II)',
	// 'Grades 7,8 (Class III)',
	// 'Grades 9,10 (Class IV)',
	// 'Grades 11,12 (Class V)',
];

const categories = [
	'',
	'Behavioral & Social Sciences', // 100
	'Biochemistry', // 200
	'Inorganic Chemistry', // 300
	'Organic Chemistry', // 400
	'Earth & Environmental Sciences', // 500
	'Animal Sciences',//600
	'Biomedical and Health Sciences', // 700
	'Microbiology', // 800
	'Physics and Astronomy', // 900
	'Engineering and Mechanics', // 1000
	'Mathematics and System Software', // 1100
	'Robotic and Intelligent Machines', // 1200
	'Botony', // 1300
];

class ProjectCard extends Component {
    state = {
		formOpen: false,
    };
						handleClickOpen = () => {
						this.setState({ formOpen: true });
					};

					handleClose = () => {
						this.setState({ formOpen: false });
					};

					getCategoryName = categoryNumber => {
						const categoryIndex = categoryNumber / 100;
						return categories[categoryIndex];
					};

					getProjectClassName = classNumber => classes[classNumber];

					
				handleSubmitResults = results => {
					const { _id, judge_id_1 , project_id} = this.props.project;
					const { judge_id } = this.props;
					//console.log
					const judgeNumber = judge_id_1 === judge_id ? 1 : 2;
					console.log("projectid in project card", project_id)
					console.log("recieved _id and judgenumber in project card" , _id, judgeNumber);
					console.log("results in project card" , results);
					this.props.handleSubmitResults(_id, judgeNumber, results);
				};


    render()
    {
        const { formOpen } = this.state;
		const { project , judge_id} = this.props;
		const {
			judge_id_1,
			judge_id_2,
			score_1,
			score_2,
			project_title,
			class: classNumber,
			category,
			project_id,
			_id,
				} = project;
        const judged =
			((judge_id_1 === judge_id && score_1 !== 0) ||(judge_id_2 === judge_id && score_2 !== 0));
						console.log("judged or not", judged);
        const projectClass = this.getProjectClassName(classNumber);
        const projectCategory = this.getCategoryName(category);
				
				return (
        
			<React.Fragment>
        <Card raised style={styles.card}>
            <CardHeader style={styles.cardHeader} title={project_title} />
            <CardContent>
                <Typography component="p"><b>Class:</b>{projectClass}</Typography>
                <Typography component="p"><b>Category:</b> {projectCategory}</Typography>
                <Typography component="p"><b>project_id:</b> {project_id}</Typography>
            </CardContent>
            <CardActions style={styles.cardActions}>
                <Button
                    onClick={this.handleClickOpen}
                    variant="contained"
                    disabled={judged}
                    color={judged ? 'disabled' : 'primary'}
                >
                    {judged ? 'Already judged' : 'Judge Now'}
                </Button>
            </CardActions>
            <JudgeFormModal
                projectid = {project_id}
                projectTitle={project_title}
                open={formOpen}
								handleClose={this.handleClose}
								handleSubmitResults={this.handleSubmitResults}
            />
				</Card>
				
		</React.Fragment> 
				);  
    }

}

export function mapDispatchToProps(dispatch) {
	return {
	  // onSubmitJudgeResult: evt => {
		// console.log("event value in login" , evt);
		// if (evt !== undefined &&  evt.preventDefault) evt.preventDefault();
		// dispatch(loadJudgeResult());
		// },
		// onUpdateJudgeResult: finalResult => dispatch(updateJudgeResult(finalResult)),
	};
  }
  
  const mapStateToProps = createStructuredSelector({
		judge_id: makeSelectUpdateJudge(),
  });
  
  const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
  );
  
//	const withReducer = injectReducer({ key: LOCAL_DASHBOARD_STATE, reducer });
//	const withSaga = injectSaga({ key: LOCAL_DASHBOARD_STATE, saga });
  
  export default compose(
		//withReducer,
		//withSaga,
		withConnect,
  )(ProjectCard);
  