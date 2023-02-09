import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

export default (controller) => {
  const triggerElement = '.project-animation-graber';
  const timelines = {
    elements: new TimelineLite()
      .fromTo(`${triggerElement} .devices`, 1, { y: '100%' }, { y: '0%' })
      .fromTo(`${triggerElement} .tablet-wrapper`, 1, { y: '40%' }, { y: '0%' }, 0)
      .fromTo(`${triggerElement} .tablet-shadow`, 1, { opacity: 0, scale: 0.5 }, { opacity: 0.5, scale: 1 }, 0.25),
    screenContent: new TimelineLite()
      .fromTo(`${triggerElement} .laptop .screen-content`, 1.5, { y: '0%' }, { y: '-70%' })
      .fromTo(`${triggerElement} .tablet .screen-content`, 2, { y: '0%' }, { y: '-70%' }, 0),
  };

  new ScrollMagic.Scene({
    triggerElement,
    duration: 1300,
  }).setClassToggle(triggerElement, 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    duration: 400,
    triggerHook: 0,
  }).setPin(`${triggerElement} .section-content`)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    duration: 800,
  }).setTween(timelines.elements)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    offset: 350,
    duration: 1200,
  }).setTween(timelines.screenContent)
    .addTo(controller);
};
