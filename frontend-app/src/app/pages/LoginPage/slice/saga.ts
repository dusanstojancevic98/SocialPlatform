import { login, logout, checkLogin } from 'app/services/AuthService';
import { call, put, takeEvery } from 'redux-saga/effects';
import { User } from 'types/models/User';
import { currentUserAction } from '.';
import { getAll, getCurrent } from '../../../services/UserService';
import { toast } from 'react-toastify';

export function* getCurrentUser() {
  try {
    if (!checkLogin()) return;
    const user: User = yield call(getCurrent);
    yield put(currentUserAction.changeUser(user));
  } catch (error) {
    console.log(error);
  }
}

export function* getAllUsers() {
  try {
    const users: User[] = yield call(getAll);
    yield put(currentUserAction.setUsers(users));
  } catch (error) {
    console.log(error);
  }
}

export function* handleLogin(action) {
  const { username, password } = action.payload;

  try {
    yield call(login, username, password);
    const user: User = yield call(getCurrent);
    yield put(currentUserAction.changeUser(user));
    window.location.href = '/';
  } catch (error) {
    toast.error('Login failed');
  }
}

export function* handleLogout(action) {
  yield call(logout);
}

// Root saga
export function* currentUserSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield takeEvery(currentUserAction.getUser.type, getCurrentUser);
  yield takeEvery(currentUserAction.login.type, handleLogin);
  yield takeEvery(currentUserAction.logout.type, handleLogout);
  yield takeEvery(currentUserAction.getUsers.type, getAllUsers);
}
