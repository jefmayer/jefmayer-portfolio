import { getSectionByName, updateSectionData } from '../../state/state';
import breakpoints from '../../utils/breakpoints';

const getNextAssetInQueue = data => (
  data.find(asset => !asset.isLoaded)
);

const getAssetsLoaded = data => (
  data
    .filter(asset => asset.isLoaded)
    .length
);

const hiresAssetLoader = (data, onComplete) => {
  const sectionName = data.name;
  const assetCt = data.hiResAsssets.length;
  if (assetCt === 0) {
    onComplete();
    return;
  }
  const { innerWidth } = window;
  const minWidth = breakpoints.find(item => item.label === 'md');
  if (innerWidth < minWidth.value) {
    return;
  }

  const update = () => {
    const section = getSectionByName(sectionName);
    const { hiResAsssets } = section;
    if (getAssetsLoaded(hiResAsssets) === hiResAsssets.length) {
      onComplete();
      return;
    }
    const asset = getNextAssetInQueue(hiResAsssets);
    const img = asset.element;
    img.src = img.getAttribute('data-hires-src');
    img.addEventListener('load', () => {
      asset.isLoaded = true;
      updateSectionData({
        name: sectionName,
        hiResAsssets,
      });
      update();
    });
  };

  update();
};

export default hiresAssetLoader;
