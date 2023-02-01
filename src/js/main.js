import { createSiteData, updateSiteData } from './state/state';
import { initLoad, updateLoad } from './modules/loaders/initial-asset-loader';
import { initMenu, updateMenu } from './modules/nav/menu';
import oovoo from './modules/scenes/oovoo';
import scroll from './utils/scroll';
import tumblr from './modules/scenes/tumblr';

createSiteData();
initLoad();
initMenu();
scroll({
  onUpdate: (name, isActive) => {
    updateSiteData({ isActive, name });
    updateMenu();
    updateLoad();
  },
});
oovoo();
tumblr();
