import ScrollMagic from 'scrollmagic';
import { TweenLite, TimelineLite, gsap } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import amplifyitScene from './amplifyit';
import graberScene from './graber';
import { introLoader, introScene } from './intro';
import oovooScene from './oovoo';
import samsungScene from './samsung';
import swfcorpScene from './swfcorp';
import trainspottedScene from './trainspotted';
import tumblrScene from './tumblr';

gsap.config({ nullTargetWarn: false });
ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite);
TweenLite.defaultOverwrite = false;

const controller = new ScrollMagic.Controller();

const addIntroLoadAnimation = () => {
  introLoader(controller);
};

const addSceneAnimations = () => {
  introScene(controller);
  amplifyitScene(controller);
  samsungScene(controller);
  graberScene(controller);
  oovooScene(controller);
  swfcorpScene(controller);
  trainspottedScene(controller);
  tumblrScene(controller);
};

export {
  addIntroLoadAnimation,
  addSceneAnimations,
};
