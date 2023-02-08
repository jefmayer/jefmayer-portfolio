import { createSiteData, updateSectionData } from './state/state';
import { initLoad, updateLoad } from './modules/loaders/initial-asset-loader';
import { initMenu, updateMenu } from './modules/nav/menu';
import scroll from './utils/scroll';

createSiteData();
initLoad();
initMenu();
scroll({
  onUpdate: (name, isActive) => {
    updateSectionData({ isActive, name });
    updateMenu();
    updateLoad();
  },
});
