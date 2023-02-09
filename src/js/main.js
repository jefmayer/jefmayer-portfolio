import { initSiteData, updateSectionData } from './api/state';
import { initLoad, updateLoad } from './modules/loaders/initial-asset-loader';
import { initMenu, updateMenu } from './modules/nav/menu';
import scroll from './utils/scroll';

initSiteData();
initLoad();
initMenu();
scroll({
  onUpdate: (name, isActive) => {
    updateSectionData({ isActive, name });
    updateMenu();
    updateLoad();
  },
});
