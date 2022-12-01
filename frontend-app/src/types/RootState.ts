// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { FriendRequestState } from 'app/pages/FriendRequests/slice/types';
import { SearchPageState } from 'app/pages/SearchUserPage/slice/types';
import { CurrentUserState } from '../app/pages/LoginPage/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  searchResultState?: SearchPageState;
  requestsState?: FriendRequestState;
  currentUserState?: CurrentUserState;
}
