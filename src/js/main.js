/*
  TODO:
  [ ] Add js from Tumblr site
  [ ] Host on amazon/heroku? Leaning amazon
  [ ] Add modal image/container to trainspotted animation
  [ ] Animate out chart for trainspotted
  [x] Fade in card content for Tumblr after flip has started
  [ ] Responsive Tumblr...
  [x] Write better meta description
  [x] Springs to Trainspotted bg color
  [ ] Fix nav hightlight so not as jumpy on click
  [ ] Check device/resolution and only load in images for mobile... might need solution on resize to load additional
  [ ] nav color should also change if inverted...
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
