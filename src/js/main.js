/*
  TODO:
  [x] Set-up hosting on Heroku - https://devcenter.heroku.com/articles/custom-domains
  [ ] Check device/resolution and only load in images for mobile... might need solution on resize to load additional
  [ ] Purchase SSL and set up
  [ ] Correct url for og:image
  [ ] scrollTo on osx/ios devices...
  [ ] Dynamically create video grid timeline
  [ ] Add in google analytics
*/

/* eslint-disable no-console */
import load from './modules/loader';
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
