/* eslint-disable no-console */
import { addIntroLoadAnimation, addSceneAnimations } from '../scenes/scenes';
import { getActiveSectionName, getSiteData, updateSiteData } from '../../state/state';
import hiresAssetLoader from './hires-asset-loader';
import breakpoints from '../../utils/breakpoints';

const html = document.querySelector('html');
const body = document.querySelector('body');
const scrollIndicator = document.querySelector('.scroll-indicator-animation');
const initLoadingBars = document.querySelector('.project-animation-intro .intro-borders');
const bgLoaderBar = document.querySelector('.background-loader-progress-bar');
const bgLoaderWrapper = document.querySelector('.background-loader-wrapper');
let prevImg = null;

const isSectionAssetLoadComplete = (data, name) => (
  data
    .find(section => section.name === name)
    .assets.filter(asset => !asset.isLoaded)
    .length === 0
);

const getNextAssetInQueue = data => (
  data
    .map(section => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .find(asset => !asset.isLoaded)
);

const getAssetsLoaded = data => (
  data
    .map(section => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .filter(asset => asset.isLoaded)
    .length
);

const getAssetsTotal = data => (
  data
    .map(section => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .length
);

const getInitialAssetsLoaded = (data, sectionName) => (
  data
    .find(section => section.name === sectionName)
    .assets
    .filter(asset => asset.isLoaded)
    .length
);

const getInitialAssetsTotal = (data, sectionName) => (
  data
    .find(section => section.name === sectionName)
    .assets
    .length
);

const addHiResAssets = (data) => {
  const assetList = document.querySelectorAll('.site-asset');
  const hiResAsssets = [...assetList]
    .filter(asset => asset.getAttribute('data-section') === data.name && asset.getAttribute('data-hires-src'))
    .map(element => ({
      element,
      isLoaded: false,
    }));
  updateSiteData({
    name: data.name,
    hiResAsssets,
  });
};

const getBreakpointLabel = (div) => {
  const { innerWidth } = window;
  // Only those breakpoints under the window width
  const arr = breakpoints.filter(item => item.value <= innerWidth);
  arr.reverse();
  // Then starting w/ the widest width, see what attributes that image has
  let attrLabel = 'data-src';
  arr.forEach((item) => {
    const { label } = item;
    if (div.getAttribute(`data-${label}-src`) !== null && attrLabel === 'data-src') {
      attrLabel = `data-${label}-src`;
    }
  });
  return attrLabel;
};

const createImg = (asset) => {
  const div = asset.element;
  const img = document.createElement('img');
  const srcAttr = getBreakpointLabel(div);
  const dataSection = div.getAttribute('data-section');
  const hiResSrc = div.getAttribute('data-hires-src');
  if (hiResSrc !== null) {
    img.setAttribute('data-hires-src', hiResSrc);
  }
  img.setAttribute('data-section', dataSection);
  img.src = div.getAttribute(srcAttr);
  img.alt = div.getAttribute('data-alt');
  img.className = 'site-asset';
  div.parentNode.appendChild(img);
  div.parentNode.removeChild(div);
  return img;
};

const onLoadComplete = () => {
  // console.log('onLoadComplete');
  // Hide background loader
  bgLoaderWrapper.classList.remove('show');
};

const onInitialLoadComplete = () => {
  // console.log('onInitialLoadComplete');
  setTimeout(() => {
    initLoadingBars.removeAttribute('style');
    body.classList.remove('site-loading');
    body.classList.add('site-loaded');
    scrollIndicator.classList.add('animate-in');
  }, 1000);

  setTimeout(() => {
    body.classList.remove('site-loaded');
    scrollIndicator.classList.add('animate-loop');
    addSceneAnimations();
  }, 2000);

  setTimeout(() => {
    // Show backround loader
    bgLoaderWrapper.classList.add('show');
  }, 3000);
};

const updateLoad = () => {
  const activeSection = getActiveSectionName();
  if (!activeSection) {
    return;
  }
  // console.log(`${activeSection.name}: ${activeSection.allInitialAssetsLoaded}`);
  if (!activeSection.allInitialAssetsLoaded) {
    // console.log('prioritize section asset load');
    html.classList.add('noscroll');
  } else {
    html.classList.remove('noscroll');
  }
};

const update = () => {
  const data = getSiteData();
  const intialSectionName = data[0].name;
  const initialAssetsTotal = getInitialAssetsTotal(data, intialSectionName);
  const assetsTotal = getAssetsTotal(data);
  // Remove previous image load event handler
  if (prevImg !== null) {
    prevImg.removeEventListener('load', update);
  }
  // Create image
  const asset = getNextAssetInQueue(data);
  const img = createImg(asset);
  // Update loader status
  asset.isLoaded = true;
  const initialAssetsLoaded = getInitialAssetsLoaded(data, intialSectionName);
  const assetsLoaded = getAssetsLoaded(data);
  // console.log(`${initialAssetsLoaded} / ${initialAssetsTotal}`);
  // console.log(`${(assetsLoaded / assetsTotal) * 100}%`);
  // Only set if still loading initial assets
  const initPercLoaded = initialAssetsLoaded / initialAssetsTotal;
  if (initPercLoaded < 1) {
    initLoadingBars.style.transform = `rotate(0) scaleX(${initPercLoaded})`;
  }
  bgLoaderBar.style.transform = `scaleX(${assetsLoaded / assetsTotal})`;
  // Check if all a section's image loads are complete
  data.forEach((section, index) => {
    const isComplete = isSectionAssetLoadComplete(data, section.name);
    if (isComplete && !section.allInitialAssetsLoaded) {
      updateSiteData({
        allInitialAssetsLoaded: true,
        name: section.name,
      });
      addHiResAssets(section);
      // Start background load of hi-res image assets, if any
      hiresAssetLoader(section, () => {
        updateSiteData({
          allHiResAssetsLoaded: true,
          name: section.name,
        });
      });
      updateLoad();
      if (index === 0) {
        onInitialLoadComplete();
      }
    }
  });
  // Load is complete
  if (assetsLoaded === assetsTotal) {
    // Remove last image loaded's event handler
    prevImg.removeEventListener('load', update);
    onLoadComplete();
    return;
  }
  img.addEventListener('load', update);
  prevImg = img;
};

const initLoad = () => {
  addIntroLoadAnimation();
  update();
  // Reset window to top
  setTimeout(() => {
    window.scroll(0, 0);
  }, 250);
};

export {
  initLoad,
  updateLoad,
};
/* eslint-enable no-console */
