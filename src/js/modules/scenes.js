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
    introRotate: new TimelineLite()
      .fromTo('.project-animation-intro .intro-borders', { rotation: 106, scaleX: 0.75 }, { rotation: 180, scaleX: 1 })
      .fromTo('.project-animation-intro .scroll-indicator-animation', { scale: 1, opacity: 1 }, { scale: 0, opacity: 0 }, 0.1),
    introOutro: new TimelineLite()
      .to('.project-animation-intro .intro-border-top', 1, { y: '-50%' })
      .to('.project-animation-intro .intro-border-bottom', 1, { y: '50%' }, 0)
      .to('.project-animation-intro .intro-inner-content', 1, { scale: 0.75, opacity: 0 }, 0)
      .to('.project-animation-intro .intro-borders', 0.5, { scaleX: 0 }, 1)
      .to('.header', 1, { y: 0 }),
    verizonElements: new TimelineLite()
      .fromTo('.project-animation-amplifyit .tablet-sampler-wrapper', 1, { visibility: 'hidden', y: '106%' }, { visibility: 'visible', y: '0%' }, 0.25) // 200 (height: 188)
      .fromTo('.project-animation-amplifyit .tablet-sampler-shadow', 1, { y: '-35%' }, { y: '0%' }, 0.25) // -50 (height: 220)
      .fromTo('.project-animation-amplifyit .mixing-board-wrapper', 1, { visibility: 'hidden', y: '234%' }, { visibility: 'visible', y: '0%' }, 0.25) // 300 (height: 128)
      .fromTo('.project-animation-amplifyit .mixing-board-shadow', 1, { y: -10 }, { y: 0 }, 0.25) // -10
      .fromTo('.project-animation-amplifyit .beats-headphones-wrapper', 1, { visibility: 'hidden', y: '120%' }, { visibility: 'visible', y: '0%' }, 0.25) // 400 (height: 153)
      .to('.project-animation-amplifyit .beats-headphones-shadow', 1, { scale: 1, y: 0, opacity: 1 }, 0.5),
    videoGrid: new TimelineLite()
      .to('.project-animation-amplifyit .video-grid-t-l', 1, { visibility: 'visible', scale: 1 }, 0)
      .to('.project-animation-amplifyit .video-grid-t-m', 1, { visibility: 'visible', scale: 1 }, 0.25)
      .to('.project-animation-amplifyit .video-grid-t-r', 1, { visibility: 'visible', scale: 1 }, 0.5)
      .to('.project-animation-amplifyit .video-grid-m-l', 1, { visibility: 'visible', scale: 1 }, 0.75)
      .to('.project-animation-amplifyit .video-grid-m-m', 1, { visibility: 'visible', scale: 1 }, 1)
      .to('.project-animation-amplifyit .video-grid-m-r', 1, { visibility: 'visible', scale: 1 }, 1.25)
      .to('.project-animation-amplifyit .video-grid-b-l', 1, { visibility: 'visible', scale: 1 }, 1.5)
      .to('.project-animation-amplifyit .video-grid-b-m', 1, { visibility: 'visible', scale: 1 }, 1.75)
      .to('.project-animation-amplifyit .video-grid-b-r', 1, { visibility: 'visible', scale: 1 }, 2)
      .fromTo('.project-animation-amplifyit .video-grid', 3, { rotateX: '0deg' }, { rotateX: '-20deg' }, 0.5),
    samsungElements: new TimelineLite()
      .fromTo('.project-animation-samsung .kiosks', 1, { y: '100%' }, { y: '0%' })
      .fromTo('.project-animation-samsung .kiosk-left-wrapper', 1, { y: '10%' }, { y: '0%' }, 0)
      .fromTo('.project-animation-samsung .kiosk-right-wrapper', 1, { y: '-10%' }, { y: '0%' }, 0)
      .fromTo('.project-animation-samsung .kiosk-right-wrapper .kiosk-ux-bg', 0.5, { opacity: 0 }, { opacity: 1 }, 0.25)
      .fromTo('.project-animation-samsung .kiosk-right-wrapper .kiosk-ux-ui-1', 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.5)
      .fromTo('.project-animation-samsung .kiosk-right-wrapper .kiosk-ux-ui-2', 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.75)
      .fromTo('.project-animation-samsung .kiosk-right-wrapper .kiosk-ux-ui-3', 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 1)
      .fromTo('.project-animation-samsung .kiosk-left-wrapper .kiosk-ux-bg', 0.5, { opacity: 0 }, { opacity: 1 }, 0.5)
      .fromTo('.project-animation-samsung .kiosk-left-wrapper .kiosk-ux-ui', 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.75),
    graberElements: new TimelineLite()
      .fromTo('.project-animation-graber .devices', 1, { y: '100%' }, { y: '0%' })
      .fromTo('.project-animation-graber .tablet-wrapper', 1, { y: '40%' }, { y: '0%' }, 0)
      .fromTo('.project-animation-graber .tablet-shadow', 1, { opacity: 0, scale: 0.5 }, { opacity: 0.5, scale: 1 }, 0.25),
    graberScreenContent: new TimelineLite()
      .fromTo('.project-animation-graber .laptop .screen-content', 1.5, { y: '0%' }, { y: '-60%' })
      .fromTo('.project-animation-graber .tablet .screen-content', 2, { y: '0%' }, { y: '-60%' }, 0),
    oovooElements: new TimelineLite()
      .fromTo('.project-animation-oovoo .site-bg', 1, { visibility: 'hidden', scale: 3, y: '-30%', borderRadius: 0 }, { visibility: 'visible', scale: 1, y: '0%', borderRadius: 4 })
      .fromTo('.project-animation-oovoo .site-hand-drawn-type', 0.5, { visibility: 'hidden', scale: 5 }, { visibility: 'visible', scale: 1 }, 0.3)
      .fromTo('.project-animation-oovoo .screen-content-wrapper', 0.5, { visibility: 'hidden', opacity: 0 }, { visibility: 'visible', opacity: 1 })
      .fromTo('.project-animation-oovoo .device-form-factor', 0.5, { visibility: 'hidden', opacity: 0 }, { visibility: 'visible', opacity: 1 }, 0.3)
      .fromTo('.project-animation-oovoo .screen-content', 1.5, { y: '0%' }, { y: '-80%' }, 1.4)
      .fromTo('.project-animation-oovoo .device-form-factor', 0.5, { scaleX: 1, scaleY: 1, rotate: '0deg' }, { scaleX: 0.2913, scaleY: 0.76, rotate: '90deg' }, 1.75)
      .fromTo('.project-animation-oovoo .site-bg', 0.5, { visibility: 'visible' }, { visibility: 'hidden' }, 1.75)
      .fromTo('.project-animation-oovoo .site-hand-drawn-type', 0.5, { visibility: 'visible' }, { visibility: 'hidden' }, 1.75)
      .fromTo('.project-animation-oovoo .screen-content-wrapper', 0.5, { scaleX: 1, scaleY: 1, rotate: '0deg' }, { scaleX: 0.2759, scaleY: 0.773, rotate: '90deg' }, 1.75)
      .fromTo('.project-animation-oovoo .device-wrapper', 0.5, { y: '0%' }, { y: '-25%' }, 1.75),
  };

  // Intro
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-intro',
    duration: 300,
    offset: 500,
  }).setTween(timelines.introRotate)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-intro',
    duration: 300,
    offset: 800,
  }).setTween(timelines.introOutro)
    .addTo(controller);

  // Verizon
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-amplifyit',
    duration: 1500,
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
  }).setTween(timelines.verizonElements)
    .addTo(controller);

  // Samsung
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-samsung',
    duration: 1500,
  }).setClassToggle('.project-animation-samsung', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-samsung',
    duration: 500,
    triggerHook: 0,
  }).setPin('.project-animation-samsung .section-content')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-samsung',
    duration: 1200,
  }).setTween(timelines.samsungElements)
    .addTo(controller);

  // Graber
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

  // ooVoo
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-oovoo',
    duration: 1100,
  }).setClassToggle('.project-animation-oovoo', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-oovoo',
    duration: 500,
    triggerHook: 0,
  }).setPin('.project-animation-oovoo .section-content')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-oovoo',
    duration: 1000,
  }).setTween(timelines.oovooElements)
    .addTo(controller);

  // Springs Corp
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-swfcorp',
    duration: 1000,
  }).setClassToggle('.project-animation-swfcorp', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-swfcorp',
    duration: 500,
    triggerHook: 0,
  }).setPin('.project-animation-swfcorp .section-content')
    .addTo(controller);

  // Trainspotted
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-trainspotted',
    duration: 1000,
  }).setClassToggle('.project-animation-trainspotted', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-trainspotted',
    duration: 500,
    triggerHook: 0,
  }).setPin('.project-animation-trainspotted .section-content')
    .addTo(controller);

  // Tumblr
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-tumblr',
    duration: 1000,
  }).setClassToggle('.project-animation-tumblr', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-tumblr',
    duration: 500,
    triggerHook: 0,
  }).setPin('.project-animation-tumblr .section-content')
    .addTo(controller);

  // Outro
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-outro',
    duration: 1200,
  }).setClassToggle('.project-animation-outro', 'in-focus')
    // .setPin('.project-animation-graber .section-content')
    .addTo(controller);
};

export {
  addIntroLoadAnimation,
  addSceneAnimations,
};
/* eslint-enable no-console */
