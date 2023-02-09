import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

const triggerElement = '.project-animation-oovoo';

const init = () => {
  // Fix for oovoo tablet scaling
  const tabletWrapper = document.querySelector(`${triggerElement} .tablet-wrapper`);
  if (tabletWrapper) {
    const adjustTabletHeight = () => {
      tabletWrapper.style.height = `${tabletWrapper.offsetWidth * 0.7494}px`;
    };
    window.addEventListener('resize', adjustTabletHeight);
    adjustTabletHeight();
  }
};

export default (controller) => {
  const timelines = {
    elements: new TimelineLite()
      .fromTo(`${triggerElement} .site-bg`, 0.05, { opacity: 0 }, { opacity: 1 }, 0)
      .fromTo(`${triggerElement} .site-bg`, 1, { visibility: 'hidden', scale: 3, borderRadius: 0 }, { visibility: 'visible', scale: 1, borderRadius: 4 }, 0)
      .fromTo(`${triggerElement} .site-hand-drawn-type`, 0.05, { opacity: 0 }, { opacity: 1 }, 0.3)
      .fromTo(`${triggerElement} .site-hand-drawn-type`, 0.5, { visibility: 'hidden', scale: 5 }, { visibility: 'visible', scale: 1 }, 0.3)
      .fromTo(`${triggerElement} .screen-content-wrapper`, 0.5, { visibility: 'hidden', opacity: 0 }, { visibility: 'visible', opacity: 1 })
      .to(`${triggerElement} .site-bg`, 0.5, { opacity: 0 })
      .to(`${triggerElement} .site-hand-drawn-type`, 0.5, { opacity: 0 })
      .fromTo(`${triggerElement} .device-wrapper`, 0.5, { visibility: 'hidden', opacity: 0 }, { visibility: 'visible', opacity: 1 }, 0.3)
      .fromTo(`${triggerElement} .tablet-wrapper`, 0.5, { x: '0%' }, { x: '-30%' }, 1.5)
      .fromTo(`${triggerElement} .site-bg`, 0.5, { visibility: 'visible' }, { visibility: 'hidden' }, 1.5)
      .fromTo(`${triggerElement} .site-hand-drawn-type`, 0.5, { visibility: 'visible' }, { visibility: 'hidden' }, 1.5)
      .fromTo(`${triggerElement} .phone-wrapper`, 0.5, { visibility: 'hidden', x: '0%' }, { visibility: 'visible', x: '150%' }, 1.5),
    screenContent: new TimelineLite()
      .fromTo(`${triggerElement} .screen-content`, 1.5, { y: '0%' }, { y: '-90%' }),
  };

  new ScrollMagic.Scene({
    triggerElement,
    duration: 1200,
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
    duration: 1000,
  }).setTween(timelines.elements)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    offset: 550,
    duration: 1000,
  }).setTween(timelines.screenContent)
    .addTo(controller);

  init();
};
