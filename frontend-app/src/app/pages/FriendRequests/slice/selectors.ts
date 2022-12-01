import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const selectDomain = (state: RootState) => {
  if (!state) return initialState;
  return state.requestsState;
};

export const selectRequests = createSelector(
  [selectDomain],
  requestsState => requestsState?.requests,
);
