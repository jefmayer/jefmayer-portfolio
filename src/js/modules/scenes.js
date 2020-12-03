/* eslint-disable no-console */
import ScrollMagic from 'scrollmagic';
import { TweenLite, TimelineLite, gsap } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

gsap.config({
  nullTargetWarn: false,
});

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
      .fromTo('.project-animation-intro .intro-borders', 1, { rotation: 106, scaleX: 0.75 }, { rotation: 180, scaleX: 1 })
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
      .fromTo('.project-animation-oovoo .screen-content', 1.5, { y: '0%' }, { y: '-80%' }),
    swfcorpElements: new TimelineLite()
      .fromTo('.project-animation-swfcorp .monitor-left-wrapper', 0.5, { visibility: 'hidden', x: '-10%' }, { visibility: 'visible', x: '0%' })
      .fromTo('.project-animation-swfcorp .monitor-right-wrapper', 0.5, { visibility: 'hidden', x: '10%' }, { visibility: 'visible', x: '0%' }, 0)
      .fromTo('.project-animation-swfcorp .device-base', 0.5, { visibility: 'hidden' }, { visibility: 'visible' }, 0),
    swfcorpScreenContent: new TimelineLite()
      .fromTo('.project-animation-swfcorp .monitor-left-wrapper .screen-content', 2, { y: '0%' }, { y: '-65%' })
      .fromTo('.project-animation-swfcorp .monitor-right-wrapper .screen-content', 2.5, { y: '0%' }, { y: '-65%' }, 0),
    trainspottedElements: new TimelineLite()
      .fromTo('.project-animation-trainspotted .data-visualization', 0.5, { visibility: 'hidden', y: '100%' }, { visibility: 'visible', y: '0%' }),
    tumblrElements: new TimelineLite()
      .fromTo('.project-animation-tumblr .info-card-wrapper', 0.5, { visibility: 'hidden', y: '40%' }, { visibility: 'visible', y: '0%' }),
    tumblrCards: new TimelineLite()
      .fromTo('.project-animation-tumblr .info-card:nth-child(1) .info-card-inner', 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, 0)
      .fromTo('.project-animation-tumblr .info-card:nth-child(2) .info-card-inner', 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, 0.125)
      .fromTo('.project-animation-tumblr .info-card:nth-child(3) .info-card-inner', 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, 0.25)
      .fromTo('.project-animation-tumblr .info-card:nth-child(4) .info-card-inner', 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, 0.375)
      .fromTo('.project-animation-tumblr .info-card:nth-child(5) .info-card-inner', 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, 0.5)
      .fromTo('.project-animation-tumblr .info-card:nth-child(6) .info-card-inner', 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, 0.625)
      .fromTo('.project-animation-tumblr .info-card:nth-child(7) .info-card-inner', 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, 0.75)
      .fromTo('.project-animation-tumblr .info-card:nth-child(8) .info-card-inner', 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, 0.875)
      .fromTo('.project-animation-tumblr .info-card:nth-child(9) .info-card-inner', 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, 1)
      .fromTo('.project-animation-tumblr .info-card:nth-child(10) .info-card-inner', 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, 1.125),
  };

  // Intro
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-intro',
    duration: 300,
    triggerHook: 0,
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

  // Springs Corp
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-swfcorp',
    duration: 1300,
  }).setClassToggle('.project-animation-swfcorp', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-swfcorp',
    duration: 400,
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

  // Trainspotted
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-trainspotted',
    duration: 1300,
  }).setClassToggle('.project-animation-trainspotted', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-trainspotted',
    duration: 1300,
  }).setClassToggle('body', 'project-trainspotted')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-trainspotted',
    duration: 400,
    triggerHook: 0,
  }).setPin('.project-animation-trainspotted .section-content')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-trainspotted',
    duration: 1200,
  }).setTween(timelines.trainspottedElements)
    .addTo(controller);

  // Tumblr
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-tumblr',
    duration: 3000, // Make duration extremely long for last project, so that bg stays fixed as footer appears
  }).setClassToggle('.project-animation-tumblr', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-tumblr',
    duration: 3000,
  }).setClassToggle('body', 'project-tumblr')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-tumblr',
    duration: 700,
    triggerHook: 0,
  }).setPin('.project-animation-tumblr .section-content')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-tumblr',
    duration: 600,
  }).setTween(timelines.tumblrElements)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-tumblr',
    duration: 600,
    // offset: 200,
  }).setTween(timelines.tumblrCards)
    .addTo(controller);
};

export {
  addIntroLoadAnimation,
  addSceneAnimations,
};
/* eslint-enable no-console */
