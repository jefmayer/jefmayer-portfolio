import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

const swfcorpScene = (controller) => {
  const timelines = {
    swfcorpElements: new TimelineLite()
      .fromTo('.project-animation-swfcorp .monitor-left-wrapper', 0.5, { visibility: 'hidden', x: '-10%' }, { visibility: 'visible', x: '0%' })
      .fromTo('.project-animation-swfcorp .monitor-right-wrapper', 0.5, { visibility: 'hidden', x: '10%' }, { visibility: 'visible', x: '0%' }, 0)
      .fromTo('.project-animation-swfcorp .device-base', 0.5, { visibility: 'hidden' }, { visibility: 'visible' }, 0),
    swfcorpScreenContent: new TimelineLite()
      .fromTo('.project-animation-swfcorp .monitor-left-wrapper .screen-content', 2, { y: '0%' }, { y: '-65%' })
      .fromTo('.project-animation-swfcorp .monitor-right-wrapper .screen-content', 2.5, { y: '0%' }, { y: '-65%' }, 0),
  };

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-swfcorp',
    duration: 1400,
  }).setClassToggle('.project-animation-swfcorp', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-swfcorp',
    duration: 250,
    triggerHook: 0,
  }).setPin('.project-animation-swfcorp .section-content')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-swfcorp',
    duration: 500,
  }).setTween(timelines.swfcorpElements)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-swfcorp',
    offset: 300,
    duration: 1400,
  }).setTween(timelines.swfcorpScreenContent)
    .addTo(controller);
};

export default swfcorpScene;
