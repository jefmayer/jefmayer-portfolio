/* eslint-disable no-console */
import { addIntroLoadAnimation, addSceneAnimations } from './scenes';

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
    addSceneAnimations();
  }, 2000);
};

const update = () => {
  const div = assetsToLoad[assetLoadedCt];
  const img = document.createElement('img');
  img.src = div.getAttribute('data-src');
  img.className = 'site-asset';
  div.parentNode.appendChild(img);
  div.parentNode.removeChild(div);
  assetLoadedCt += 1;
  console.log(`${(assetLoadedCt / assetsToLoad.length) * 100}%`);
  loadingBars.style.transform = `rotate(0) scaleX(${assetLoadedCt / assetsToLoad.length})`;
  if (assetLoadedCt === assetsToLoad.length) {
    onLoadComplete();
    return;
  }
  update();
};

const load = () => {
  window.scrollTo(0, 0);
  addIntroLoadAnimation();
  update();
  // [].map.call(itemsToLoad, (div) => {
  // });
};

export default load;
/* eslint-enable no-console */
