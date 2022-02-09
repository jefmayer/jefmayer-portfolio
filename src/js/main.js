/*
  TODO:
  [x] Purchase SSL and set up
  [ ] Check device/resolution and only load in images for mobile... might need solution on resize to load additional
  [x] Dynamically create video grid timeline
  [x] Add in google analytics
*/

/* eslint-disable no-console */
import load from './modules/loaders/init-loader';
import menu from './modules/menu';
import tumblr from './modules/tumblr';

load();
menu();
tumblr();
// Fix for oovoo tablet scaling
const oovooTabletWrapper = document.querySelector('.project-animation-oovoo .tablet-wrapper');
if (oovooTabletWrapper) {
  const adjustTabletHeight = () => {
    oovooTabletWrapper.style.height = `${oovooTabletWrapper.offsetWidth * 0.7494}px`;
  };
  window.addEventListener('resize', adjustTabletHeight);
  adjustTabletHeight();
}
/* eslint-enable no-console */
