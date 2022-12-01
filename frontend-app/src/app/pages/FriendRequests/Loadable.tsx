/**
 * Asynchronously loads the component for SearchUserPage
 */

import { lazyLoad } from 'utils/loadable';

export const FriendRequestsPage = lazyLoad(
  () => import('./index'),
  module => module.FriendRequestsPage,
);
