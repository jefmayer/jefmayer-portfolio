import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';
import { hideMenu } from '../nav/menu';

const introLoader = (controller) => {
  new ScrollMagic.Scene({
    triggerElement: '.project-animation-intro',
    duration: 1000,
  }).setClassToggle('.project-animation-intro', 'in-focus')
    .setPin('.project-animation-intro .section-content')
    .addTo(controller);
};

const introScene = (controller) => {
  const timelines = {
    introRotate: new TimelineLite()
      .fromTo('.project-animation-intro .intro-borders', 1, { rotation: 106, scaleX: 0.75 }, { rotation: 180, scaleX: 1 })
      .fromTo('.project-animation-intro .scroll-indicator-animation', { scale: 1, opacity: 1 }, { scale: 0, opacity: 0 }, 0.1),
    introOutro: new TimelineLite()
      .to('.project-animation-intro .intro-border-top', 1, { y: '-50%' })
      .to('.project-animation-intro .intro-border-bottom', 1, { y: '50%' }, 0)
      .to('.project-animation-intro .intro-inner-content', 1, { scale: 0.75, opacity: 0 }, 0)
      .to('.project-animation-intro .intro-borders', 0.5, { scaleX: 0 }, 1)
      .call(() => {
        hideMenu();
      }, null, null, 2),
  };

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
};

export {
  introLoader,
  introScene,
};
