import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const selectDomain = (state: RootState) => {
  if (!state) return initialState;
  return state.currentUserState;
};

export const selectUser = createSelector(
  [selectDomain],
  currentUserState => currentUserState?.user,
);

export const selectUsers = createSelector(
  [selectDomain],
  currentUserState => currentUserState?.users,
);
