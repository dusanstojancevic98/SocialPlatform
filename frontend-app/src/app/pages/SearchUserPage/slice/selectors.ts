import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const selectDomain = (state: RootState) => {
  if (!state) return initialState;
  return state.searchResultState;
};

export const selectSearchResult = createSelector(
  [selectDomain],
  searchState => searchState?.searchResult,
);

export const selectSearchText = createSelector(
  [selectDomain],
  searchState => searchState?.searchText,
);
