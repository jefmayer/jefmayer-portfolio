/* eslint-disable no-console */
import { addIntroLoadAnimation, addSceneAnimations } from '../scenes/scenes';
import {
  getActiveSectionName,
  getSiteData,
  updateSectionData,
  updateSiteData,
} from '../../state/state';
import hiresAssetLoader from './hires-asset-loader';
import breakpoints from '../../utils/breakpoints';

const html = document.querySelector('html');
const body = document.querySelector('body');
const bgLoaderBar = document.querySelector('.background-loader-progress-bar');
const bgLoaderWrapper = document.querySelector('.background-loader-wrapper');
const initLoadingBars = document.querySelector('.project-animation-intro .intro-borders');
const sectionLoader = document.querySelector('.section-loader-animation');

const disableScroll = () => {
  // console.log('disableScroll');
  html.classList.add('noscroll');
  sectionLoader.classList.add('animate-in');
  setTimeout(() => {
    sectionLoader.classList.add('animate-loop');
  }, 300);
};

const enableScroll = () => {
  // console.log('enableScroll');
  html.classList.remove('noscroll');
  sectionLoader.classList.remove('animate-in');
  sectionLoader.classList.remove('animate-loop');
};

const isSectionAssetLoadComplete = (data, name) => (
  data
    .find(section => section.name === name)
    .assets.filter(asset => !asset.isLoaded)
    .length === 0
);

// Add param to allow jumping the queue
const getNextAssetInQueue = () => {
  const data = getSiteData();
  const { selectedSection, sections } = data;
  // If section specified, get that section's assets
  if (selectedSection !== '') {
    const nextAssetToLoad = sections.find(section => section.name === selectedSection)
      .assets.find(asset => !asset.isLoaded);
    // If there are still assets to load in that section, load,
    // otherwise return to load queue
    if (nextAssetToLoad) {
      return nextAssetToLoad;
    }
    // Reset selected section var
    updateSiteData({ selectedSection: '' });
    enableScroll();
  }
  return sections
    .map(section => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .find(asset => !asset.isLoaded);
};

const removeSectionEventHandlers = (assets) => {
  assets.forEach((asset) => {
    const { element } = asset;
    element.removeEventListener('load', update); /* eslint-disable-line no-use-before-define */
  });
};

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
  updateSectionData({
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
  updateSiteData({ isLoadComplete: true });
  bgLoaderWrapper.classList.remove('show');
};

const onInitialLoadComplete = () => {
  const scrollIndicator = document.querySelector('.scroll-indicator-animation');
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
    const data = getSiteData();
    const { isLoadComplete } = data;
    if (!isLoadComplete) {
      // Show backround loader
      bgLoaderWrapper.classList.add('show');
    }
  }, 3000);
};

const updateLoad = () => {
  const activeSection = getActiveSectionName();
  const data = getSiteData();
  const { selectedSection } = data;
  if (!activeSection) {
    return;
  }
  if (
    (!activeSection.allInitialAssetsLoaded && selectedSection === '') ||
    (!activeSection.allInitialAssetsLoaded && selectedSection === activeSection.name)
  ) {
    disableScroll();
  } else {
    enableScroll();
  }
};

const update = () => {
  const data = getSiteData();
  const { sections } = data;
  const intialSectionName = sections[0].name;
  const initialAssetsTotal = getInitialAssetsTotal(sections, intialSectionName);
  const assetsTotal = getAssetsTotal(sections);
  // Create image
  const asset = getNextAssetInQueue();
  if (!asset) {
    return;
  }
  const img = createImg(asset);
  // Update loader status
  asset.isLoaded = true;
  const initialAssetsLoaded = getInitialAssetsLoaded(sections, intialSectionName);
  const assetsLoaded = getAssetsLoaded(sections);
  // console.log(`${initialAssetsLoaded} / ${initialAssetsTotal}`);
  // console.log(`${(assetsLoaded / assetsTotal) * 100}%`);
  // Only set if still loading initial assets
  const initPercLoaded = initialAssetsLoaded / initialAssetsTotal;
  if (initPercLoaded < 1) {
    initLoadingBars.style.transform = `rotate(0) scaleX(${initPercLoaded})`;
  }
  bgLoaderBar.style.transform = `scaleX(${assetsLoaded / assetsTotal})`;
  // Check if all a section's image loads are complete
  sections.forEach((section, index) => {
    const isComplete = isSectionAssetLoadComplete(sections, section.name);
    if (isComplete && !section.allInitialAssetsLoaded) {
      // console.log(`${section.name}, isComplete: ${isComplete}`);
      removeSectionEventHandlers(section.assets);
      updateSectionData({
        allInitialAssetsLoaded: true,
        name: section.name,
      });
      addHiResAssets(section);
      // Start background load of hi-res image assets, if any
      hiresAssetLoader(section, () => {
        updateSectionData({
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
    onLoadComplete();
    return;
  }
  img.addEventListener('load', update);
};

const initLoad = () => {
  addIntroLoadAnimation();
  // Multi-threaded loader
  update();
  update();
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
