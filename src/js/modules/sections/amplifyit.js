import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

export default (controller) => {
  const triggerElement = '.project-animation-amplifyit';
  const timelines = {
    elements: new TimelineLite()
      .fromTo(`${triggerElement} .tablet-sampler-wrapper`, 1, { visibility: 'hidden', y: '106%' }, { visibility: 'visible', y: '0%' }, 0.25) // 200 (height: 188)
      .fromTo(`${triggerElement} .tablet-sampler-shadow`, 1, { y: '-35%' }, { y: '0%' }, 0.25) // -50 (height: 220)
      .fromTo(`${triggerElement} .mixing-board-wrapper`, 1, { visibility: 'hidden', y: '234%' }, { visibility: 'visible', y: '0%' }, 0.25) // 300 (height: 128)
      .fromTo(`${triggerElement} .mixing-board-shadow`, 1, { y: -10 }, { y: 0 }, 0.25) // -10
      .fromTo(`${triggerElement} .beats-headphones-wrapper`, 1, { visibility: 'hidden', y: '120%' }, { visibility: 'visible', y: '0%' }, 0.25) // 400 (height: 153)
      .to(`${triggerElement} .beats-headphones-shadow`, 1, { scale: 1, y: 0, opacity: 1 }, 0.5),
    videoGrid: new TimelineLite()
      .to(`${triggerElement} .video-grid-t-l`, 1, { visibility: 'visible', scale: 1 }, 0)
      .to(`${triggerElement} .video-grid-t-m`, 1, { visibility: 'visible', scale: 1 }, 0.25)
      .to(`${triggerElement} .video-grid-t-r`, 1, { visibility: 'visible', scale: 1 }, 0.5)
      .to(`${triggerElement} .video-grid-m-l`, 1, { visibility: 'visible', scale: 1 }, 0.75)
      .to(`${triggerElement} .video-grid-m-m`, 1, { visibility: 'visible', scale: 1 }, 1)
      .to(`${triggerElement} .video-grid-m-r`, 1, { visibility: 'visible', scale: 1 }, 1.25)
      .to(`${triggerElement} .video-grid-b-l`, 1, { visibility: 'visible', scale: 1 }, 1.5)
      .to(`${triggerElement} .video-grid-b-m`, 1, { visibility: 'visible', scale: 1 }, 1.75)
      .to(`${triggerElement} .video-grid-b-r`, 1, { visibility: 'visible', scale: 1 }, 2)
      .fromTo(`${triggerElement} .video-grid`, 3, { rotateX: '0deg' }, { rotateX: '-20deg' }, 0.5),
  };

  new ScrollMagic.Scene({
    triggerElement,
    duration: 1500,
  }).setClassToggle(triggerElement, 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    duration: 600,
    triggerHook: 0,
  }).setPin(`${triggerElement} .section-content`)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    duration: 300,
  }).setTween(timelines.videoGrid)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    duration: 800,
  }).setTween(timelines.elements)
    .addTo(controller);
};
