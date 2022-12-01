/**
 * Asynchronously loads the component for SearchUserPage
 */

import { lazyLoad } from 'utils/loadable';

export const SearchUserPage = lazyLoad(
  () => import('./index'),
  module => module.SearchUserPage,
);
