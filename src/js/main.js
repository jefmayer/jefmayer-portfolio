/* eslint-disable no-console */
import { getSiteData, updateSiteData } from './modules/loaders/state';
import { initLoad, updateLoad } from './modules/loaders/index';
import { initMenu, updateMenu } from './modules/menu';
import scroll from './modules/scroll';
import tumblr from './modules/tumblr';

const siteData = getSiteData();

initLoad(siteData);
initMenu(siteData);
scroll({
  data: siteData,
  onUpdate: (section, isActive) => {
    const data = updateSiteData({
      data: siteData,
      isActive,
      section,
    });
    updateMenu(data);
    updateLoad(data);
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
