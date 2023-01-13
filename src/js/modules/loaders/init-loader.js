/* eslint-disable no-console */
import { addIntroLoadAnimation, addSceneAnimations } from '../scenes';
import backgroundLoad from './background-loader';
import breakpoints from './breakpoints';

const addLoadAssetsToArray = () => {
  const assetList = document.querySelectorAll('.add-site-img');
  const assetArr = [...assetList];
  return [...new Set(assetArr
    .map(element => element.getAttribute('data-section')))]
    .map(name => ({
      allHiResAssetsLoaded: false,
      allInitialAssetsLoaded: false,
      assets: assetArr
        .filter(asset => asset.getAttribute('data-section') === name)
        .map(element => ({
          element,
          isLoaded: false,
        })),
      hiResAsssets: [],
      name,
    }));
};

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

const getLoadedAssets = data => (
  data
    .map(section => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .filter(asset => asset.isLoaded)
    .length
);

const getTotalAssets = data => (
  data
    .map(section => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .length
);

const addHiResAssets = (data) => {
  const assetList = document.querySelectorAll('.site-asset');
  data.hiResAsssets = [...assetList]
    .filter(asset => asset.getAttribute('data-section') === data.name && asset.getAttribute('data-hires-src'))
    .map(element => ({
      element,
      isLoaded: false,
    }));
};

const load = () => {
  const loadingBars = document.querySelector('.project-animation-intro .intro-borders');
  const data = addLoadAssetsToArray();
  console.log(data);
  let prevImg = null;
  // [ ] If user clicks a nav item, and section is not loaded, jump to that sections assets
  //     and make sure they're loaded before advancing to section, show spinner
  // [ ] Prevent scroll/show spinner if sections's assets are not loaded
  // [ ] After each section's assets are loaded, and if section is in view,
  //     check to see if there's additional hi-res assets to load before
  //     continuing on with other items in queue
  // [ ] Start load of any hi-res assets once section's assets are complete
  const onInitialLoadComplete = () => {
    console.log('onInitialLoadComplete');
    const body = document.querySelector('body');
    const scrollIndicator = document.querySelector('.scroll-indicator-animation');

    setTimeout(() => {
      loadingBars.removeAttribute('style');
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

  const onLoadComplete = () => {
    console.log('onLoadComplete');
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

  const update = () => {
    // Remove previous image load event handler
    if (prevImg !== null) {
      prevImg.removeEventListener('load', update);
    }
    const asset = getNextAssetInQueue(data);
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
    // Update loader status
    asset.isLoaded = true;
    const assetsLoaded = getLoadedAssets(data);
    const assetsTotal = getTotalAssets(data);
    // console.log(`${(assetsLoaded / assetsTotal) * 100}%`);
    loadingBars.style.transform = `rotate(0) scaleX(${assetsLoaded / assetsTotal})`;
    // Check if all a section's image loads are complete
    // ...maybe move to a function
    data.forEach((section, index) => {
      const isComplete = isSectionAssetLoadComplete(data, section.name);
      if (isComplete && !section.allInitialAssetsLoaded) {
        section.allInitialAssetsLoaded = true;
        addHiResAssets(section);
        // console.log(`Begin hi-res asset loader for ${section.name}`);
        // Start background load of hi-res image assets, if any
        backgroundLoad(section.hiResAsssets, () => {
          section.allHiResAssetsLoaded = true;
          // console.log(`End hi-res asset loader for ${section.name}`);
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
  addIntroLoadAnimation();
  update();
  // Reset window to top
  setTimeout(() => {
    window.scroll(0, 0);
  }, 250);
};

export default load;
/* eslint-enable no-console */
