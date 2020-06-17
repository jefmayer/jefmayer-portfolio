/* eslint-disable no-console */
import ScrollMagic from 'scrollmagic';
import { TweenLite, TimelineLite } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite);
TweenLite.defaultOverwrite = false;

const controller = new ScrollMagic.Controller();

const addIntroLoadAnimation = () => {
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-intro',
    duration: 1000,
  }).setClassToggle('.project-animation-intro', 'in-focus')
    .setPin('.project-animation-intro .section-content')
    .addTo(controller);
};

const addSceneAnimations = () => {
  const timelines = {
    intro: new TimelineLite()
      .to('.project-animation-intro .intro-border-top', 1, { y: '-50%' })
      .to('.project-animation-intro .intro-border-bottom', 1, { y: '50%' }, 0)
      .to('.project-animation-intro .intro-inner-content', 1, { scale: 0.75, opacity: 0 }, 0)
      .to('.project-animation-intro .intro-borders', 0.5, { scaleX: 0 }, 1)
      .to('.header', 1, { y: 0 }),
    ampElements: new TimelineLite()
      .to('.project-animation-amplifyit .video-grid-wrapper', 1, { y: 0 })
      .fromTo('.project-animation-amplifyit .tablet-sampler-wrapper', 1, { visibility: 'hidden', y: '106%' }, { visibility: 'visible', y: '0%' }, 0.25) // 200 (height: 188)
      .fromTo('.project-animation-amplifyit .tablet-sampler-shadow', 1, { y: '-35%' }, { y: '0%' }, 0.25) // -50 (height: 220)
      .fromTo('.project-animation-amplifyit .mixing-board-wrapper', 1, { visibility: 'hidden', y: '234%' }, { visibility: 'visible', y: '0%' }, 0.25) // 300 (height: 128)
      .fromTo('.project-animation-amplifyit .mixing-board-shadow', 1, { y: -10 }, { y: 0 }, 0.25) // -10
      .fromTo('.project-animation-amplifyit .beats-headphones-wrapper', 1, { visibility: 'hidden', y: '120%' }, { visibility: 'visible', y: '0%' }, 0.25) // 400 (height: 153)
      .to('.project-animation-amplifyit .beats-headphones-shadow', 1, { scale: 1, y: 0, opacity: 1 }, 0.5),
    videoGrid: new TimelineLite()
      .to('.project-animation-amplifyit .video-grid-t-l', 1, { visibility: 'visible', scale: 1 })
      .to('.project-animation-amplifyit .video-grid-t-m', 1, { visibility: 'visible', scale: 1 }, 0.25)
      .to('.project-animation-amplifyit .video-grid-t-r', 1, { visibility: 'visible', scale: 1 }, 0.5)
      .to('.project-animation-amplifyit .video-grid-m-l', 1, { visibility: 'visible', scale: 1 }, 0.75)
      .to('.project-animation-amplifyit .video-grid-m-m', 1, { visibility: 'visible', scale: 1 }, 1)
      .to('.project-animation-amplifyit .video-grid-m-r', 1, { visibility: 'visible', scale: 1 }, 1.25)
      .to('.project-animation-amplifyit .video-grid-b-l', 1, { visibility: 'visible', scale: 1 }, 1.5)
      .to('.project-animation-amplifyit .video-grid-b-m', 1, { visibility: 'visible', scale: 1 }, 1.75)
      .to('.project-animation-amplifyit .video-grid-b-r', 1, { visibility: 'visible', scale: 1 }, 2),
  };

  // Intro
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-intro',
    duration: 300,
    offset: 500,
  }).setTween(TweenLite.fromTo('.project-animation-intro .intro-borders', { rotation: 106, scaleX: 0.75 }, { rotation: 180, scaleX: 1 }))
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-intro',
    duration: 300,
    offset: 800,
  }).setTween(timelines.intro)
    .addTo(controller);

  // AmplifyIt
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-amplifyit',
    duration: 1600,
  }).setClassToggle('.project-animation-amplifyit', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-amplifyit',
    duration: 600,
    triggerHook: 0,
  }).setPin('.project-animation-amplifyit .section-content')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-amplifyit',
    duration: 300,
  }).setTween(timelines.videoGrid)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-amplifyit',
    duration: 800,
  }).setTween(timelines.ampElements)
    .addTo(controller);

  // Samsung
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-samsung',
    duration: 1200,
  }).setClassToggle('.project-animation-samsung', 'in-focus')
    .setPin('.project-animation-samsung .section-content')
    .addTo(controller);

  // Graber
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-graber',
    duration: 1200,
  }).setClassToggle('.project-animation-graber', 'in-focus')
    .setPin('.project-animation-graber .section-content')
    .addTo(controller);
};

export {
  addIntroLoadAnimation,
  addSceneAnimations,
};
/* eslint-enable no-console */
