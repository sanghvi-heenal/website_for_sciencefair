import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
      <center>
							<p size="3">
								The University of Southern Mississippi | 118
								College Drive, Hattiesburg, MS 39406-0001 |
								601.266.4379{' '}
							</p>
							<p>
								© 2019 The University of Southern Mississippi.
								All rights reserved.
							</p>
						</center>
      </section>
    </Wrapper>
  );
}

export default Footer;
