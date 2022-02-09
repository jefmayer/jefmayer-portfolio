/* eslint-disable no-console */
import { addIntroLoadAnimation, addSceneAnimations } from '../scenes';
import backgroundLoad from './background-loader';
import breakpoints from './breakpoints';

const load = () => {
  const loadingBars = document.querySelector('.project-animation-intro .intro-borders');
  const assetsToLoad = document.querySelectorAll('.add-site-img');
  let prevImg = null;
  let assetLoadedCt = 0;

  const onLoadComplete = () => {
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

    // Start background load of hi-res image assets
    backgroundLoad();
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
    const div = assetsToLoad[assetLoadedCt];
    const img = document.createElement('img');
    const srcAttr = getBreakpointLabel(div);
    const hiResSrc = div.getAttribute('data-hires-src');
    if (hiResSrc !== null) {
      img.setAttribute('data-hires-src', hiResSrc);
    }
    img.src = div.getAttribute(srcAttr);
    img.alt = div.getAttribute('data-alt');
    img.className = 'site-asset';
    div.parentNode.appendChild(img);
    div.parentNode.removeChild(div);
    assetLoadedCt += 1;
    // console.log(`${(assetLoadedCt / assetsToLoad.length) * 100}%`);
    loadingBars.style.transform = `rotate(0) scaleX(${assetLoadedCt / assetsToLoad.length})`;
    if (assetLoadedCt === assetsToLoad.length) {
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
