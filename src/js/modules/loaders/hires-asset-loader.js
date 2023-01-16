import breakpoints from './breakpoints';

const getNextAssetInQueue = data => (
  data.find(asset => !asset.isLoaded)
);

const getAssetsLoaded = data => (
  data
    .filter(asset => asset.isLoaded)
    .length
);

const hiresAssetLoader = (assets, onComplete) => {
  if (assets.length === 0) {
    onComplete();
    return;
  }
  const { innerWidth } = window;
  const minWidth = breakpoints.find(item => item.label === 'md');
  if (innerWidth < minWidth.value) {
    return;
  }

  const update = () => {
    if (getAssetsLoaded(assets) === assets.length) {
      onComplete();
      return;
    }
    const asset = getNextAssetInQueue(assets);
    const img = asset.element;
    img.src = img.getAttribute('data-hires-src');
    img.addEventListener('load', () => {
      asset.isLoaded = true;
      update();
    });
  };

  update();
};

export default hiresAssetLoader;
