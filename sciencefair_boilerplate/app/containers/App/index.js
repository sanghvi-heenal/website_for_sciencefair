/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Router } from 'react-router-dom';

import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

import HomePage from '../../components/Homepage';
import Downloadable from '../StudentForm/Downloadable';
import Fairs from '../../components/Fairs';
import Instructions from '../../components/Instructions';
import Judge_Login from 'containers/Judge_Login/Loadable';
import Judge_Dashboard from 'containers/Judge_Dashboard/Loadable';
import StudentForm from 'containers/StudentForm/Loadable';
import AdminOperations from 'containers/AdminOperations/Loadable';
import Password_Reset from '../Judge_Login/Password_Reset';
import DeleteJudge from '../AdminOperations/DeleteJudge';
import DeleteStudent from '../AdminOperations/DeleteStudent';
import Ranks from '../AdminOperations/Ranks';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Judge_Registration from 'containers/Judge_Registration/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';


const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  background-color:	#FFE4C4;
`;

//export default function App() {
  export default function App() {


  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
     
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/studentregistration" component={StudentForm} />
        <Route path="/downloadable" component={Downloadable} />
        <Route path="/fairs" component={Fairs} />
        <Route path="/studentform" component={Instructions} />
        <Route path="/judgelogin" component={Judge_Login} />
        <Route path="/judge_dashboard"component={Judge_Dashboard} />
        <Route path="/password_reset"component={Password_Reset} />
        <Route exact path="/judgeregistration" component={Judge_Registration} />
        <Route path="/admin"component={AdminOperations} />
        <Route path="/deletejudge"component={DeleteJudge} />
        <Route path="/deletestudent"component={DeleteStudent} />
        <Route path="/rank"component={Ranks} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
 }


