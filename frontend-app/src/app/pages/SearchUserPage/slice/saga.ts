import { takeEvery, call, put, select } from 'redux-saga/effects';
import { searchPageAction } from '.';
import { selectSearchText } from './selectors';
import { UserSearchDTO } from 'types/models/UserSearchDTO';
import { sendFriendRequest, search } from 'app/services/UserService';

export function* searchUsers() {
  const searchText: string = yield select(selectSearchText);
  const users: UserSearchDTO[] = yield call(search, searchText);
  yield put(searchPageAction.changeResult(users));
}

export function* addFriend(action) {
  const senderId = action.payload[0];
  const reciverId = action.payload[1];
  yield call(sendFriendRequest, senderId, reciverId);
  yield put(searchPageAction.changeType(reciverId));
}

// Root saga
export function* searchSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield takeEvery(searchPageAction.search.type, searchUsers);
  yield takeEvery(searchPageAction.addFriend.type, addFriend);
}
