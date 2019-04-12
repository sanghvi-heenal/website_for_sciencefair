import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import logo from './usm.png';
import back from './back.jpg';
import messages from './messages';
import styled from 'styled-components';



/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>

        <A href="https://www.usm.edu/science-math-education">
        <center>
          <img src={logo} alt="logo"  />
          <h3>
							{' '}
							University of Southern Mississippi Region-I Science
							and Engineering Fair
						</h3>
            </center>
          
        </A>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/fairs">
            <FormattedMessage {...messages.fairs} />
          </HeaderLink>
          <HeaderLink to="/studentform">
            <FormattedMessage {...messages.studentform} />
          </HeaderLink>

          <HeaderLink to="/judgeregistration">
            <FormattedMessage {...messages.judgeregistration} />
          </HeaderLink>
          <HeaderLink to="/judgelogin">
            <FormattedMessage {...messages.judgelogin} />
          </HeaderLink>
          <HeaderLink to="/admin">
            <FormattedMessage {...messages.admin} />
          </HeaderLink>
          
        </NavBar>
      </div>
    );
  }
}

export default Header;
