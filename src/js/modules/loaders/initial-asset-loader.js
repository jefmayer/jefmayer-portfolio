/* eslint-disable no-console */
import { addIntroLoadAnimation, addSceneAnimations } from '../scenes/scenes';
import { getActiveSectionName, getSiteData, updateSiteData } from '../../state/state';
import hiresAssetLoader from './hires-asset-loader';
import breakpoints from '../../utils/breakpoints';

// [ ] If user clicks a nav item, and section is not loaded, jump to that sections assets
//     and make sure they're loaded before advancing to section, show spinner
// [ ] Prevent scroll/show spinner if sections's assets are not loaded
// [ ] After each section's assets are loaded, and if section is in view,
//     check to see if there's additional hi-res assets to load before
//     continuing on with other items in queue
// [ ] Asset loader should only reflect loaded/total of initial assets,
//     however I still want to know when all assets are loaded
const body = document.querySelector('body');
const scrollIndicator = document.querySelector('.scroll-indicator-animation');
const initLoadingBars = document.querySelector('.project-animation-intro .intro-borders');
const bgLoadingBar = document.querySelector('.background-load-progress-bar');
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
  console.log('onLoadComplete');
};

const onInitialLoadComplete = () => {
  console.log('onInitialLoadComplete');

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
  initLoadingBars.style.transform = `rotate(0) scaleX(${initialAssetsLoaded / initialAssetsTotal})`;
  bgLoadingBar.style.transform = `scaleX(${assetsLoaded / assetsTotal})`;
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

const updateLoad = () => {
  const activeSection = getActiveSectionName();
  if (!activeSection) {
    return;
  }
  console.log(getSiteData());
  console.log(`${activeSection.name}, isLoaded: ${activeSection.allInitialAssetsLoaded}`);
  if (!activeSection.allInitialAssetsLoaded) {
    console.log('prioritize section asset load');
  }
};

export {
  initLoad,
  updateLoad,
};
/* eslint-enable no-console */
