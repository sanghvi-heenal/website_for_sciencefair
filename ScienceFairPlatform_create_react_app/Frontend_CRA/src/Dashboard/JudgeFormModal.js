/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import MenuItem from '@material-ui/core/MenuItem';

const maxValues = {
	research: 10,
	design: 15,
	execution: 20,
	creativity: 20,
	presentation: 35,
};

class JudgeFormModal extends Component {
	state = {
		research: null,
		design: null,
		execution: null,
		creativity: null,
		presentation: null,
	};

	handleSubmit = () => {
		console.log("judge from model handle submit" , this.state);
		this.props.handleSubmitResults(this.state);
		this.props.handleClose();
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	getValues = maxValue => {
		const valuesArray = [];

		for (let i = 1; i <= maxValue; i++) {
			valuesArray.push(i);
		}

		return valuesArray;
	};

	render() {
		const { fullScreen, open, handleClose, projectTitle , projectid} = this.props;
		const {
			research,
			design,
			execution,
			creativity,
			presentation,
		} = this.state;

		const formComplete =
			research && design && execution && creativity && presentation;

		return (
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					<b>Project Title:</b>{projectTitle}
				</DialogTitle>
				<DialogTitle id="responsive-dialog-title"></DialogTitle>
				<b>Project_Id:</b>{projectid}
				<DialogContent>
					<TextField
						select
						fullWidth
						id="standard-select-number"
						label="Research Question:"
						value={research}
						onChange={this.handleChange('research')}
						margin="normal"
						helperText="Please score between 0 and 10"
						InputLabelProps={{
							shrink: research,
						}}
					>{this.state.research}
						{this.getValues(maxValues.research).map(value => (
							
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))
						}
					</TextField>
					<TextField
						select
						fullWidth
						id="standard-select-number"
						label="Design and Methodology:"
						value={design}
						onChange={this.handleChange('design')}
						margin="normal"
						helperText="Please score between 0 and 15"
						InputLabelProps={{
							shrink: design,
						}}
					>
						{this.getValues(maxValues.design).map(value => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						fullWidth
						id="standard-select-number"
						label="Execution: Data Collection, Analysis, &amp; Interpretation"
						value={execution}
						onChange={this.handleChange('execution')}
						margin="normal"
						helperText="Please score between 0 and 20"
						InputLabelProps={{
							shrink: execution,
						}}
					>
						{this.getValues(maxValues.execution).map(value => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						fullWidth
						id="standard-select-number"
						label="Creativity:"
						value={creativity}
						onChange={this.handleChange('creativity')}
						margin="normal"
						helperText="Please score between 0 and 20"
						InputLabelProps={{
							shrink: creativity,
						}}
					>
						{this.getValues(maxValues.creativity).map(value => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						fullWidth
						id="standard-select-number"
						label="Presentation:"
						value={presentation}
						onChange={this.handleChange('presentation')}
						margin="normal"
						helperText="Please score between 0 and 35"
						InputLabelProps={{
							shrink: presentation,
						}}
					>
						{this.getValues(maxValues.presentation).map(value => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</TextField>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						variant="text"
						color="secondary"
					>
						Cancel
					</Button>
					<Button
						onClick={this.handleSubmit}
						variant="contained"
						disabled={!formComplete}
						color={formComplete ? 'primary' : 'disabled'}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default withMobileDialog()(JudgeFormModal);
