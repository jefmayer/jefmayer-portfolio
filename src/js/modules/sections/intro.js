import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';
import { hideMenu } from '../nav/menu';

const triggerElement = '.project-animation-intro';

const loader = (controller) => {
  new ScrollMagic.Scene({
    triggerElement,
    duration: 1000,
  }).setClassToggle(triggerElement, 'in-focus')
    .setPin(`${triggerElement} .section-content`)
    .addTo(controller);
};

const intro = (controller) => {
  const timelines = {
    introRotate: new TimelineLite()
      .fromTo(`${triggerElement} .intro-borders`, 1, { rotation: 106, scaleX: 0.75 }, { rotation: 180, scaleX: 1 })
      .fromTo(`${triggerElement} .scroll-indicator-animation`, { scale: 1, opacity: 1 }, { scale: 0, opacity: 0 }, 0.1),
    introOutro: new TimelineLite()
      .to(`${triggerElement} .intro-border-top`, 1, { y: '-50%' })
      .to(`${triggerElement} .intro-border-bottom`, 1, { y: '50%' }, 0)
      .to(`${triggerElement} .intro-inner-content`, 1, { scale: 0.75, opacity: 0 }, 0)
      .to(`${triggerElement} .intro-borders`, 0.5, { scaleX: 0 }, 1)
      .call(() => {
        hideMenu();
      }, null, null, 2)
      .to('.header', 1, { y: 0 }),
  };

  new ScrollMagic.Scene({
    triggerElement,
    duration: 300,
    triggerHook: 0,
  }).setTween(timelines.introRotate)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    duration: 300,
    offset: 800,
  }).setTween(timelines.introOutro)
    .addTo(controller);
};

export {
  intro,
  loader,
};
