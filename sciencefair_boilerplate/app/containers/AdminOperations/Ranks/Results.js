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
import Datatable from './Datatable';
import { loadRanks } from '../../App/actions';
import {LOCAL_GET_RANKS} from '../actions';
import { onChangeGetRank } from '../actions';
import {makeSelectGetRankResponse} from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

/* eslint-disable react/prefer-stateless-function */
export class Results extends React.PureComponent {
    constructor(props){
        super(props); 
        this.state={
            value:'',
            show: false,
            show_error: false,
            rankStatus:'',
        } 
   
    }
   
  render() {
              const { getRankresponse} = this.props;
              console.log("rank list in results" , getRankresponse)
              var column = [ 's_name1', 's_name2', 'project_id', 
              'project_title' , 'category','class','average_score','std_deviation' ,'z_score' ,'rank',];
              console.log("column", column);

              var tableHeaders = (<thead>
                <tr>
                  {column.map(function(column) {
                    return <th>{column}</th>; })}
                </tr>
            </thead>);
            var tableBody = getRankresponse.map(function(getRankresponse) {
              return (
                
                <tr>
                  {column.map(function(column) {
                    return <td>{getRankresponse[column]}</td>; })}
                </tr>
                ); });

    return (
      <article>
            <table className="table table-bordered table-hover"
                  width="100%"
                  border="3" 
                  cellspacing="3"
                  cellpadding="2">
        {tableHeaders}
        {tableBody}
      </table>
          
      </article>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
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
//const withSaga = injectSaga({ key:'get_ranks', saga });

export default compose(
  withReducer,
  //withSaga,
  withConnect,
)(Results);
