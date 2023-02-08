import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

const init = () => {
  // Fix for oovoo tablet scaling
  const oovooTabletWrapper = document.querySelector('.project-animation-oovoo .tablet-wrapper');
  if (oovooTabletWrapper) {
    const adjustTabletHeight = () => {
      oovooTabletWrapper.style.height = `${oovooTabletWrapper.offsetWidth * 0.7494}px`;
    };
    window.addEventListener('resize', adjustTabletHeight);
    adjustTabletHeight();
  }
};

const oovooScene = (controller) => {
  const timelines = {
    oovooElements: new TimelineLite()
      .fromTo('.project-animation-oovoo .site-bg', 0.05, { opacity: 0 }, { opacity: 1 }, 0)
      .fromTo('.project-animation-oovoo .site-bg', 1, { visibility: 'hidden', scale: 3, borderRadius: 0 }, { visibility: 'visible', scale: 1, borderRadius: 4 }, 0)
      .fromTo('.project-animation-oovoo .site-hand-drawn-type', 0.05, { opacity: 0 }, { opacity: 1 }, 0.3)
      .fromTo('.project-animation-oovoo .site-hand-drawn-type', 0.5, { visibility: 'hidden', scale: 5 }, { visibility: 'visible', scale: 1 }, 0.3)
      .fromTo('.project-animation-oovoo .screen-content-wrapper', 0.5, { visibility: 'hidden', opacity: 0 }, { visibility: 'visible', opacity: 1 })
      .to('.project-animation-oovoo .site-bg', 0.5, { opacity: 0 })
      .to('.project-animation-oovoo .site-hand-drawn-type', 0.5, { opacity: 0 })
      .fromTo('.project-animation-oovoo .device-wrapper', 0.5, { visibility: 'hidden', opacity: 0 }, { visibility: 'visible', opacity: 1 }, 0.3)
      .fromTo('.project-animation-oovoo .tablet-wrapper', 0.5, { x: '0%' }, { x: '-30%' }, 1.5)
      .fromTo('.project-animation-oovoo .site-bg', 0.5, { visibility: 'visible' }, { visibility: 'hidden' }, 1.5)
      .fromTo('.project-animation-oovoo .site-hand-drawn-type', 0.5, { visibility: 'visible' }, { visibility: 'hidden' }, 1.5)
      .fromTo('.project-animation-oovoo .phone-wrapper', 0.5, { visibility: 'hidden', x: '0%' }, { visibility: 'visible', x: '150%' }, 1.5),
    oovooScreenContent: new TimelineLite()
      .fromTo('.project-animation-oovoo .screen-content', 1.5, { y: '0%' }, { y: '-90%' }),
  };

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-oovoo',
    duration: 1200,
  }).setClassToggle('.project-animation-oovoo', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-oovoo',
    duration: 400,
    triggerHook: 0,
  }).setPin('.project-animation-oovoo .section-content')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-oovoo',
    duration: 1000,
  }).setTween(timelines.oovooElements)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-oovoo',
    offset: 550,
    duration: 1000,
  }).setTween(timelines.oovooScreenContent)
    .addTo(controller);

  init();
};

export default oovooScene;
