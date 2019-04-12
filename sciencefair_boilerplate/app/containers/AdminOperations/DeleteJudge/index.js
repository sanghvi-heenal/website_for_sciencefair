/*
 * DeleteJudge
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';
import { Link, withRouter , Redirect } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from '../AtPrefix';
import CenteredSection from '../CenteredSection';
import Form from '../Form';
import Input from '../Input';
import Button from '../../../components/Button';
import Section from '../Section';
import messages from '../messages';
import { loadJudgeDeletion } from '../../App/actions';
import {onChangeDeleteJudge} from '../actions';
import {LOCAL_JUDGE_DELETION} from '../constants';
import {makeSelectJudgeDeletionResponse } from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

/* eslint-disable react/prefer-stateless-function */
export class DeleteJudge extends React.PureComponent {
    constructor(props){
        super(props); 
        this.state={
            judgeName:'',
            judgeEmail:'',
            value:'',
            show: false,
            show_error: false,
            deleteStatus:'',
        } 
   
    }

    handleChangeName =(event) =>
    {
        this.setState({judgeName : event.target.value});
    }
    handleChangeEmail= (event) =>
    {     
        this.setState({judgeEmail: event.target.value});
    }
    handleSubmit = () =>
    {
        const deleteJudge = {
            name: this.state.judgeName,
            login_email: this.state.judgeEmail,
        }
        console.log("dalatejudge",deleteJudge);
        this.props.onUpdateDeleteJudge(deleteJudge);
        this.props.onSubmitDeletion();
    }


  render() {
    const {show, show_error , judgeEmail , judgeName} = this.state;
    const {judgedelresponse} = this.props;
    if(judgedelresponse.code== 200)
        {
          console.log("start redirecting");
          this.setState({deleteStatus:''});
          this.setState({show: true });
          judgedelresponse.code= 0;
          judgedelresponse.status= false;
          console.log("response in 200" , this.props.judgedelresponse)
          //this.props.onUpdatedelResponse(judgedelresponse);
          console.log("show now", show);

        // return( <Redirect to ="/judgelogin"/>);
        }
       if(judgedelresponse.code==400)
       {
          console.log("not valid")
          this.setState({show: false });
          console.log("show now", show);
          this.setState({deleteStatus:'Invalid login Credentials'});
        }
    return (
      <article>
          <AtPrefix>
          <Button onClick ={ () => {window.location.replace("http://localhost:3000/adminoperations")}}> Admin Logout</Button>
          <SweetAlert
                
                show={this.state.show}
                title="Done"
                text=" Judge is Removed from Sciencefair 2019 Database"
                onConfirm={() => {
                    this.setState({ show: false });
                    return (<Redirect to="/adminoperations"/>);
                    }}
            />
                <SweetAlert
                    className="red-bg"
                    show={this.state.show_error}
                    title="Error Removing the Judge"   
                    onConfirm={() => this.setState({ show_error: false })}
                />
               
                <h4><b>Delete a Judge from the Database</b></h4>
                <br/>
                <label>
                <b>Judge Name</b>
                    <input  type ="text" name="name"
                            value={judgeName}  
                            onChange={this.handleChangeName}
                            style={{border: '1px solid black'}}
                           />
                </label>
                <br/><br/>
                <label>
                <b>Judge Email</b>
                    <input  type="email"
                            required name="email"
                            value={judgeEmail}
                            onChange={this.handleChangeEmail}
                            style={{border: '1px solid black'}}
                            />
                            </label>
                            {/* Onchange={this.handleChange} */}
                <br/><br/>
                    <input
                    type="submit"
                    value="DeleteJudge"
                    onClick={this.handleSubmit}
                     style={{border: '1px solid black'}} />
                    <h2>{this.state.deleteStatus}</h2>

          </AtPrefix>

      </article>
    );
  }
}



export function mapDispatchToProps(dispatch) {
  return {
    onUpdateDeleteJudge: deleteJudge => dispatch(onChangeDeleteJudge(deleteJudge)),
    onSubmitDeletion: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadJudgeDeletion());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  judgedelresponse: makeSelectJudgeDeletionResponse(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: LOCAL_JUDGE_DELETION, reducer });
const withSaga = injectSaga({ key: LOCAL_JUDGE_DELETION, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DeleteJudge);
