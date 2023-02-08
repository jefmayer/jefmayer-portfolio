import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

const samsungScene = (controller) => {
  const timelines = {
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
  };

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
};

export default samsungScene;
