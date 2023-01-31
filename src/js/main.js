/* eslint-disable no-console */
import { createSiteData, updateSiteData } from './modules/loaders/state';
import { initLoad, updateLoad } from './modules/loaders/index';
import { initMenu, updateMenu } from './modules/menu';
import scroll from './modules/scroll';
import tumblr from './modules/tumblr';

createSiteData();

initLoad();
initMenu();
scroll({
  onUpdate: (section, isActive) => {
    updateSiteData({
      isActive,
      section,
    });
    updateMenu();
    updateLoad();
  },
});
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
