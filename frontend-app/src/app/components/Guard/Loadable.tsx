import { lazyLoad } from 'utils/loadable';

export const Guard = lazyLoad(
  () => import('./index'),
  module => module.Guard,
);
