import {
  getFriendRequest,
  acceptFriendRequest as AFR,
  deleteFriendRequest,
} from 'app/services/FriendshipService';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Friendship } from 'types/models/Friendship';
import { friendRequestAction } from '.';

export function* getFriendRequests(action) {
  const senderId = action.payload;

  const requests: Friendship[] = yield call(getFriendRequest, senderId);
  yield put(friendRequestAction.changeRequests(requests));
}

export function* acceptFriendRequest(action) {
  const friendshipId = action.payload;

  yield call(AFR, friendshipId);
  yield put(friendRequestAction.handleAccept(friendshipId));
}

export function* declineFriendRequest(action) {
  const friendshipId = action.payload;

  yield call(deleteFriendRequest, friendshipId);
  yield put(friendRequestAction.deleteReq(friendshipId));
}

function* watchGetFriendRequest() {
  yield takeLatest(friendRequestAction.getRequests.type, getFriendRequests);
}

function* watchAcceptFriendRequest() {
  yield takeLatest(friendRequestAction.acceptRequest.type, acceptFriendRequest);
}
function* watchDeclineFriendRequest() {
  yield takeLatest(
    friendRequestAction.declineRequest.type,
    declineFriendRequest,
  );
}

// Root saga
export function* friendRequstsSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield all([
    watchGetFriendRequest(),
    watchAcceptFriendRequest(),
    watchDeclineFriendRequest(),
  ]);
}
