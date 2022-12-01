/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const HeroPage = lazyLoad(
  () => import('./index'),
  module => module.HeroPage,
);
