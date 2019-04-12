/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  fairs: {
    id: `${scope}.fairs`,
    defaultMessage: 'Fairs',
  },
  studentform: {
    id: `${scope}.studentform`,
    defaultMessage: 'Student Form',
  },
  judgeregistration: {
    id: `${scope}.judgeregistration`,
    defaultMessage: 'Judge Register',
  },
  judgelogin: {
    id: `${scope}.judgelogin`,
    defaultMessage: 'Judge Login',
  },
  admin: {
    id: `${scope}.admin`,
    defaultMessage: 'Admin',
  },
});
