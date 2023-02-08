import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

const amplifyitScene = (controller) => {
  const timelines = {
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
  };

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
};

export default amplifyitScene;
