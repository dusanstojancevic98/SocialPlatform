import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { FriendRequestState } from './types';
import { friendRequstsSaga } from './saga';

// The initial state of the Homepage
export const initialState: FriendRequestState = {
  requests: [],
};

const slice = createSlice({
  name: 'requestsState',
  initialState,
  reducers: {
    changeRequests(state, action) {
      state.requests = action.payload;
    },

    getRequests(state, action) {},

    acceptRequest(state, action) {},

    declineRequest(state, action) {},

    deleteReq(state, action) {
      const index = state.requests.findIndex(req => req.id === action.payload);
      state.requests.splice(index, 1);
    },

    handleAccept(state, action) {
      const index = state.requests.findIndex(req => req.id === action.payload);
      state.requests[index].accepted = true;
    },
  },
});

export const { actions: friendRequestAction, reducer } = slice;

export const useFriendRequestSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: friendRequstsSaga });
  return { actions: slice.actions };
};
