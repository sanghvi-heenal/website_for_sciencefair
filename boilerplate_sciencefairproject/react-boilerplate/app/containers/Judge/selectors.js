/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import {LOCAL_STATE_NAME} from './constants';

const selectHome = state => state.get(LOCAL_STATE_NAME, initialState);




  const makeSelectName = () =>
  createSelector(selectHome, homeState => homeState.get('name'));
  const makeSelectEmail = () =>
  createSelector(selectHome, homeState => homeState.get('email'));
  const makeSelectPassword = () =>
  createSelector(selectHome, homeState => homeState.get('password'));

export { selectHome, makeSelectName,makeSelectUsername,makeSelectEmail , makeSelectPassword  };
