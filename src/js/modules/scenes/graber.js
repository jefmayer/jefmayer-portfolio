import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

const graberScene = (controller) => {
  const timelines = {
    graberElements: new TimelineLite()
      .fromTo('.project-animation-graber .devices', 1, { y: '100%' }, { y: '0%' })
      .fromTo('.project-animation-graber .tablet-wrapper', 1, { y: '40%' }, { y: '0%' }, 0)
      .fromTo('.project-animation-graber .tablet-shadow', 1, { opacity: 0, scale: 0.5 }, { opacity: 0.5, scale: 1 }, 0.25),
    graberScreenContent: new TimelineLite()
      .fromTo('.project-animation-graber .laptop .screen-content', 1.5, { y: '0%' }, { y: '-70%' })
      .fromTo('.project-animation-graber .tablet .screen-content', 2, { y: '0%' }, { y: '-70%' }, 0),
  };

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-graber',
    duration: 1300,
  }).setClassToggle('.project-animation-graber', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-graber',
    duration: 400,
    triggerHook: 0,
  }).setPin('.project-animation-graber .section-content')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-graber',
    duration: 800,
  }).setTween(timelines.graberElements)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-graber',
    offset: 350,
    duration: 1200,
  }).setTween(timelines.graberScreenContent)
    .addTo(controller);
};

export default graberScene;
