/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import JudgeFormModal from './JudgeFormModal';

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
		const { _id, judge_id_1 } = this.props.project;
		const { judgeId } = this.props;
	
		const judgeNumber = judge_id_1 === judgeId ? 1 : 2;
		console.log("recieved _id and judgenumber" , _id, judgeNumber);
		console.log("results in project card" , results);
		this.props.handleSubmitResults(_id, judgeNumber, results);
	};

	render() {
		const { formOpen } = this.state;
		const { project, judgeId  } = this.props;
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
			(judge_id_1 === judgeId && score_1 !== 0) ||
			(judge_id_2 === judgeId && score_2 !== 0);

		const projectClass = this.getProjectClassName(classNumber);
		const projectCategory = this.getCategoryName(category);

		return (
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
		);
	}
}

export default ProjectCard;
