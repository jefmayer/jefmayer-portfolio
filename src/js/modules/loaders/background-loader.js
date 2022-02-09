/* eslint-disable no-console */
import breakpoints from './breakpoints';

const backgroundLoad = () => {
  const { innerWidth } = window;
  const minWidth = breakpoints.find(item => item.label === 'md');
  if (innerWidth < minWidth.value) {
    return;
  }

  const assetsToLoad = document.querySelectorAll('[data-hires-src]');
  let assetLoadedCt = 0;

  const update = () => {
    const img = assetsToLoad[assetLoadedCt];
    img.src = img.getAttribute('data-hires-src');
    assetLoadedCt += 1;
    if (assetLoadedCt === assetsToLoad.length) {
      return;
    }
    img.addEventListener('load', () => {
      update();
    });
  };

  update();
};

export default backgroundLoad;
/* eslint-enable no-console */
