/*
 * AdminOperations
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
import { Link, withRouter , Redirect } from 'react-router-dom';
import Button from '../../components/Button';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadAdmin } from '../App/actions';
import { onChangeAdmin } from './actions';
import {makeSelectAdminResponse} from './selectors';
import { LOCAL_ADMIN} from './constants';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AdminOperations extends React.PureComponent {
     constructor(props)
      {
        super(props);
       this.state={
         admin_email:'',
         admin_password:'',
         admin:{},
         show:false,
         loginStatus:'',

       }
      }

      handleChange = (e) =>
      {
        this.setState({[e.target.name] : e.target.value})
      }
      handleSubmit = () =>
      {
        const a = {
          admin_email: this.state.admin_email,
          admin_password : this.state.admin_password,
        }
        this.props.onUpdateAdmin(a)
        this.props.onSubmitAdmin();
      }
  render() {
    const {adminresponse} = this.props;
    const {show,loginStatus} = this.state 
        if(adminresponse.code== 200)
        {
          console.log("start redirecting");
          this.setState({show: true });
          console.log("show now", show);
          adminresponse.code == 404;
        // return( <Redirect to ="/judgelogin"/>);
        }
       if(adminresponse.code==404)
       {
          console.log("not valid")
          this.setState({show: false });
          console.log("show now", show);
          this.setState({loginStatus:'Invalid login Credentials'});
        }
       
    return (
     <React.Fragment>
       {show &&
          <div>
              <Button onClick ={ () => {window.location.replace("http://localhost:3000/judgelogin")}}>Logout</Button>
             <h4>Check Ranks</h4>
            <Link 	to="/rank"><Button>Ranks</Button></Link>
            <h4>Delete a Judge from the Sciencefair Database</h4>
            <Link to="/deletejudge"><Button> Delete Judge</Button></Link>

             <h4>Delete a Student from the Sciencefair Database</h4>
            <Link 	to="/deletestudent"><Button> Delete Student</Button></Link>


          </div>
            }
       {!show&&<article>
							<h2>Admin Login</h2>
								
											<label>Email:</label>
											<input
                        type="email"
                        name="admin_email"
                        value={this.state.admin_email}
                        onChange={this.handleChange}
                        style={{border: '1px solid black'}}/>
									
                      <br/>
											<label>Password:</label>
											<input
                        type="password"
                        name="admin_password"
                        value={this.state.admin_password}
                        onChange={this.handleChange}
                        style={{border: '1px solid black'}}
												className="form-control"	/>
                        	<input
										type="submit"
                    value="Login"
                    onClick={this.handleSubmit}
										color="primary"
                    className="btn btn-primary"
                    style={{border: '1px solid black'}}	/> 
										<h2>{this.state.loginStatus}</h2>
      </article>
       }
      </React.Fragment>
    );
  }
}



export function mapDispatchToProps(dispatch) {
  return {
    onSubmitAdmin: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadAdmin());
    },
    onUpdateAdmin: admin => dispatch(onChangeAdmin(admin)),
   
  };
}

const mapStateToProps = createStructuredSelector({
  adminresponse :makeSelectAdminResponse(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

 const withReducer = injectReducer({ key: LOCAL_ADMIN, reducer });
const withSaga = injectSaga({ key: LOCAL_ADMIN, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminOperations);
