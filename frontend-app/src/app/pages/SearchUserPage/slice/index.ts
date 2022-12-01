import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { SearchPageState } from './types';
import { searchSaga } from './saga';

// The initial state of the Homepage
export const initialState: SearchPageState = {
  searchResult: [],
  searchText: '',
};

const slice = createSlice({
  name: 'searchResultState',
  initialState,
  reducers: {
    changeResult(state, action) {
      state.searchResult = action.payload;
    },
    search(state, action) {
      state.searchText = action.payload;
    },

    addFriend(state, action) {},

    changeType(state, action) {
      const reciverId = action.payload;
      const index = state.searchResult.findIndex(res => res.id === reciverId);
      state.searchResult[index].friends = false;
    },
  },
});

export const { actions: searchPageAction, reducer } = slice;

export const useSearchPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: searchSaga });
  return { actions: slice.actions };
};
