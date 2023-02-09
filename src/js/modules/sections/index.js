import ScrollMagic from 'scrollmagic';
import { TweenLite, TimelineLite, gsap } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import amplifyit from './amplifyit';
// import graber from './graber';
import { intro, loader } from './intro';
import oovoo from './oovoo';
import samsung from './samsung';
import swfcorp from './swfcorp';
import trainspotted from './trainspotted';
import tumblr from './tumblr';
import vitale from './vitale';

gsap.config({ nullTargetWarn: false });
ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite);
TweenLite.defaultOverwrite = false;

const controller = new ScrollMagic.Controller();

const addIntroLoadAnimation = () => {
  loader(controller);
};

const addSectionAnimations = () => {
  intro(controller);
  amplifyit(controller);
  samsung(controller);
  // graber(controller);
  oovoo(controller);
  swfcorp(controller);
  trainspotted(controller);
  tumblr(controller);
  vitale(controller);
};

export {
  addIntroLoadAnimation,
  addSectionAnimations,
};
