/* eslint-disable no-console */
import { createSiteData, updateSiteData } from './state/state';
import { initLoad, updateLoad } from './modules/loaders/initial-asset-loader';
import { initMenu, updateMenu } from './modules/nav/menu';
import scroll from './utils/scroll';
import tumblr from './modules/scenes/tumblr';

createSiteData();
initLoad();
initMenu();
scroll({
  onUpdate: (name, isActive) => {
    updateSiteData({
      isActive,
      name,
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
