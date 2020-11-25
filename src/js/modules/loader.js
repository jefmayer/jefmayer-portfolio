/* eslint-disable no-console */
import { addIntroLoadAnimation, addSceneAnimations } from './scenes';

const load = () => {
  const loadingBars = document.querySelector('.project-animation-intro .intro-borders');
  const assetsToLoad = document.querySelectorAll('.add-site-img');
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
  };

  const update = () => {
    const div = assetsToLoad[assetLoadedCt];
    const img = document.createElement('img');
    // Check for screen-size/device? to determine whether to load data-lores-asset
    img.src = div.getAttribute('data-src');
    img.alt = div.getAttribute('data-alt');
    img.className = 'site-asset';
    div.parentNode.appendChild(img);
    div.parentNode.removeChild(div);
    assetLoadedCt += 1;
    // console.log(`${(assetLoadedCt / assetsToLoad.length) * 100}%`);
    loadingBars.style.transform = `rotate(0) scaleX(${assetLoadedCt / assetsToLoad.length})`;
    if (assetLoadedCt === assetsToLoad.length) {
      onLoadComplete();
      return;
    }
    img.addEventListener('load', () => {
      update();
    });
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
