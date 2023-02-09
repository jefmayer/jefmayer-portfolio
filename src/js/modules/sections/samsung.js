import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

export default (controller) => {
  const triggerElement = '.project-animation-samsung';
  const timelines = {
    elements: new TimelineLite()
      .fromTo(`${triggerElement} .kiosks`, 1, { y: '100%' }, { y: '0%' })
      .fromTo(`${triggerElement} .kiosk-left-wrapper`, 1, { y: '10%' }, { y: '0%' }, 0)
      .fromTo(`${triggerElement} .kiosk-right-wrapper`, 1, { y: '-10%' }, { y: '0%' }, 0)
      .fromTo(`${triggerElement} .kiosk-right-wrapper .kiosk-ux-bg`, 0.5, { opacity: 0 }, { opacity: 1 }, 0.25)
      .fromTo(`${triggerElement} .kiosk-right-wrapper .kiosk-ux-ui-1`, 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.5)
      .fromTo(`${triggerElement} .kiosk-right-wrapper .kiosk-ux-ui-2`, 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.75)
      .fromTo(`${triggerElement} .kiosk-right-wrapper .kiosk-ux-ui-3`, 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 1)
      .fromTo(`${triggerElement} .kiosk-left-wrapper .kiosk-ux-bg`, 0.5, { opacity: 0 }, { opacity: 1 }, 0.5)
      .fromTo(`${triggerElement} .kiosk-left-wrapper .kiosk-ux-ui`, 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.75),
  };

  new ScrollMagic.Scene({
    triggerElement,
    duration: 1500,
  }).setClassToggle(triggerElement, 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    duration: 500,
    triggerHook: 0,
  }).setPin(`${triggerElement} .section-content`)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement,
    duration: 1200,
  }).setTween(timelines.elements)
    .addTo(controller);
};
