// /*
//  * Ranks
//  *
//  * This is the first thing users see of our App, at the '/' route
//  */

// import React from 'react';
// import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
// import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
// import 'sweetalert/dist/sweetalert.css';
// import { Link, withRouter , Redirect } from 'react-router-dom';
// //import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';
// import {
//   makeSelectRepos,
//   makeSelectLoading,
//   makeSelectError,
// } from 'containers/App/selectors';
// import H2 from '../../../components/H2';
// import ReposList from '../../../components/ReposList';
// import AtPrefix from '../AtPrefix';
// import CenteredSection from '../CenteredSection';
// import Form from '../Form';
// import Input from '../Input';
// import Section from '../Section';
// import messages from '../messages';
// import Datatable from './Datatable';
// import { loadRanks } from '../../App/actions';
// import {LOCAL_GET_RANKS} from '../actions';
// import { onChangeGetRank } from '../actions';
// import {makeSelectGetRankResponse} from '../selectors';
// import reducer from '../reducer';
// import saga from '../saga';
// import { withStyles } from '@material-ui/core';

// /* eslint-disable react/prefer-stateless-function */
// const styles = theme => ({
//     root: {
//       width: '100%',
//       marginTop: theme.spacing.unit * 3,
//       overflowX: 'auto',
//     },
//     table: {
//       minWidth: 700,
//     },
//   });
// export class Results extends React.PureComponent {
//     constructor(props){
//         super(props); 
//         this.state={
//             value:'',
//             show: false,
//             show_error: false,
//             rankStatus:'',
//         } 
   
//     }
   
//   render() {
//               const { getRankresponse, classes} = this.props;
//               console.log("rank list in results" , getRankresponse)
//             getRankresponse.map(row => 
//               {
//                 console.log("value of rows", row);
//               }
//               )
//               var column = [ 's_name1', 's_name1', 'project_id', 
//               'project_title' , 'rank','6', '7' , '8', '9', '10'];
//               console.log("column", column);

//     return (
//       <article>
     
         
//           <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>student1</TableCell>
//             <TableCell align="right">Student2</TableCell>
//             <TableCell align="right">project ID</TableCell>
//             <TableCell align="right">Project title</TableCell>
//             <TableCell align="right">Rank</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {getRankresponse.map((row,index) => {
//             <TableRow key='1' >
//               <TableCell component="th" scope="row">
//                 {row.s_name1}
//               </TableCell>
//               <TableCell align="right">{row.s_name2}</TableCell>
//               <TableCell align="right">{row.project_title}</TableCell>
//               <TableCell align="right">{row.category}</TableCell>
//               <TableCell align="right">{row.rank}</TableCell>
//             </TableRow>    
//           })
//           }
//         </TableBody>
//       </Table>
//     </Paper>
          
//       </article>
//     );
//   }
// }


// export function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

// const mapStateToProps = createStructuredSelector({
//   getRankresponse: makeSelectGetRankResponse(),
// });

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// const withReducer = injectReducer({ key:'get_ranks', reducer });
// //const withSaga = injectSaga({ key:'get_ranks', saga });

// export default compose(
//   withReducer,
//   //withSaga,
//   withConnect,
//   withStyles(styles),
// )(Results);
