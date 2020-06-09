/* eslint-disable no-console */
import { addIntroLoadAnimation, addSceneAnimations } from './scenes';

const loadingBars = document.querySelector('.project-animation-intro .intro-borders');
const assetsToLoad = document.querySelectorAll('.add-site-img');
let assetLoadedCt = 0;

const onLoadComplete = () => {
  const body = document.querySelector('body');

  setTimeout(() => {
    loadingBars.removeAttribute('style');
    body.classList.remove('site-loading');
    body.classList.add('site-loaded');
  }, 1000);

  setTimeout(() => {
    body.classList.remove('site-loaded');
    addSceneAnimations();
  }, 2000);
};

const update = () => {
  console.log(`${(assetLoadedCt / assetsToLoad.length) * 100}%`);
  loadingBars.style.transform = `rotate(0) scaleX(${assetLoadedCt / assetsToLoad.length})`;
  const div = assetsToLoad[assetLoadedCt];
  const img = document.createElement('img');
  img.src = div.getAttribute('data-src');
  div.parentNode.appendChild(img);
  div.parentNode.removeChild(div);
  assetLoadedCt += 1;
  if (assetLoadedCt === assetsToLoad.length) {
    onLoadComplete();
    return;
  }
  update();
};

const load = () => {
  addIntroLoadAnimation();
  update();
  // [].map.call(itemsToLoad, (div) => {
  // });
};

export default load;
/* eslint-enable no-console */
