/*
 * Ranks
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
import H2 from '../../../components/H2';
import ReposList from '../../../components/ReposList';
import AtPrefix from '../AtPrefix';
import CenteredSection from '../CenteredSection';
import Form from '../Form';
import Input from '../Input';
import Section from '../Section';
import messages from '../messages';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';
import { loadRanks } from '../../App/actions';
import {LOCAL_GET_RANKS} from '../actions';
import { onChangeGetRank } from '../actions';
import {makeSelectGetRankResponse} from '../selectors';
import Results from './Results';
import reducer from '../reducer';
import saga from '../saga';

/* eslint-disable react/prefer-stateless-function */
export class Ranks extends React.PureComponent {
    constructor(props){
        super(props); 
        this.state={
            s_class:-1,
            category:-1,
            value:'',
            show: false,
            show_error: false,
            rankStatus:'',
        } 
   
    }
   validationCheckClass =(event) =>
    {
        this.setState({s_class : event.target.value});
    }
    validationCheckCategory= (event) =>
    {     
        this.setState({category: event.target.value});
    }
    handleSubmit  = () =>
    {
        const {s_class , category} = this.state;
        const getRank = 
        {
            s_class : s_class,
            category: category
        }
        console.log("rank ",getRank);
        this.props.onUpdateGetRank(getRank);
         this.props.onSubmitDetails();

    }

  render() {
              const {show, show_error} = this.state;
              const { getRankresponse} = this.props;
              console.log("getRankRes", getRankresponse);
            if(getRankresponse.length>0)
            {
                  if(getRankresponse!==[])
                  {
                    console.log("start redirecting");
                    this.setState({show: true });
                    console.log("show now", show);
                    getRankresponse.code == 404;
                  // return( <Redirect to ="/judgelogin"/>);
                  }
                  if(getRankresponse.length == 0)
                  {
                    console.log("not valid")
                    this.setState({show: false });
                    console.log("show now", show);
                    this.setState({loginStatus:'Invalid login Credentials'});
                  }
                }

    return (
      <article>
          <Button onClick ={ () => {window.location.replace("http://localhost:3000/judgelogin")}}>Logout</Button>
       <AtPrefix>
           <br/>
                        <label>
                        Class:
                        </label>
                        <select
									ref="s_class"
									className="form-control"
                                    required
									defaultValue={this.state.s_class}
                                    onBlur={this.validationCheckClass}
                                    style={{border: '1px solid black'}}
								>
                                <option value="-1">
										Select Grade
									</option>
									<option value="1">
										Grades 1,2,3 Class(I)
									</option>
									<option value="2">
										Grades 4,5,6 Class(II)
									</option>
                                </select>
            <br/>
                        <label>
                        Category:
                        </label>
                        <select
									ref="category"
									autoComplete="off"
									required
									defaultValue={this.state.category}
                                    onBlur={this.validationCheckCategory}
                                    style={{border: '1px solid black'}}
								>
                                    <option value="-1">
										Select Category
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
                        <br/><br/>
                    <input
                    type="submit"
                    value="Results"
                    onClick={this.handleSubmit}
                     style={{border: '1px solid black'}} />
                    <h2>{this.state.rankStatus}</h2>                
       </AtPrefix>
       <Wrapper>
       {show&& <Results/>}
       </Wrapper>
      </article>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    onUpdateGetRank: getRank => 
    {   console.log("dispatch",getRank);
        dispatch(onChangeGetRank(getRank))},
    onSubmitDetails: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRanks());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  getRankresponse: makeSelectGetRankResponse(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key:'get_ranks', reducer });
const withSaga = injectSaga({ key:'get_ranks', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Ranks);
