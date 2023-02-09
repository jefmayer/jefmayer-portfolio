import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

export default (controller) => {
  const triggerElement = '.project-animation-swfcorp';
  const timelines = {
    elements: new TimelineLite()
      .fromTo(`${triggerElement} .monitor-left-wrapper`, 0.5, { visibility: 'hidden', x: '-10%' }, { visibility: 'visible', x: '0%' })
      .fromTo(`${triggerElement} .monitor-right-wrapper`, 0.5, { visibility: 'hidden', x: '10%' }, { visibility: 'visible', x: '0%' }, 0)
      .fromTo(`${triggerElement} .device-base`, 0.5, { visibility: 'hidden' }, { visibility: 'visible' }, 0),
    screenContent: new TimelineLite()
      .fromTo(`${triggerElement} .monitor-left-wrapper .screen-content`, 2, { y: '0%' }, { y: '-65%' })
      .fromTo(`${triggerElement} .monitor-right-wrapper .screen-content`, 2.5, { y: '0%' }, { y: '-65%' }, 0),
  };

  new ScrollMagic.Scene({
    triggerElement,
    duration: 1400,
  }).setClassToggle(triggerElement, 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    duration: 250,
    triggerHook: 0,
  }).setPin(`${triggerElement} .section-content`)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    duration: 500,
  }).setTween(timelines.elements)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    offset: 300,
    duration: 1400,
  }).setTween(timelines.screenContent)
    .addTo(controller);
};
