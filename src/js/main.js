/* eslint-disable no-console */
import load from './modules/loaders/index';
import { getLoadData } from './modules/loaders/state';
import menu from './modules/menu';
import tumblr from './modules/tumblr';

const loadData = getLoadData();
load(loadData);
menu(loadData);

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
