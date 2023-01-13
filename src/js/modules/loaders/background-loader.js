/* eslint-disable no-console */
import breakpoints from './breakpoints';

const backgroundLoad = (assets, onComplete) => {
  if (assets.length === 0) {
    onComplete();
    return;
  }
  const { innerWidth } = window;
  const minWidth = breakpoints.find(item => item.label === 'md');
  if (innerWidth < minWidth.value) {
    return;
  }
  let assetLoadedCt = 0;

  const update = () => {
    const img = assets[assetLoadedCt].element;
    img.src = img.getAttribute('data-hires-src');
    assetLoadedCt += 1;
    // console.log(`${assetLoadedCt}/${assets.length}`);
    if (assetLoadedCt === assets.length) {
      onComplete();
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
