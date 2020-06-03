/* eslint-disable no-console */
import ScrollMagic from 'scrollmagic';
import { TweenLite, TimelineLite } from 'gsap'; // Also works with TweenMax and TimelineMax
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite);

// [].map.call(document.querySelectorAll('.site-section'), (section) => {
// if (scrollFromTop <= section.offsetTop && document.querySelectorAll('.site-section.in-focus').length === 0) {
// section.classList.add('in-focus');
// }
// });
// Backgrounds
const controller = new ScrollMagic.Controller();


const timeline = new TimelineLite();
timeline.to('.site-section-intro .content-border-top', 1, { y: '-50%' })
  .to('.site-section-intro .content-border-bottom', 1, { y: '50%' }, 0)
  .to('.site-section-intro .inner-content', 1, { scale: 0.75, opacity: 0 }, 0)
  .to('.site-section-intro .content-wrapper', 0.25, { opacity: 0 });
// Intro
new ScrollMagic.Scene({ triggerElement: '.site-section-intro', duration: 1100 })
  .setClassToggle('.site-section-intro', 'in-focus')
  .setPin('.site-section-intro .section-content')
  .addTo(controller);
new ScrollMagic.Scene({ triggerElement: '.site-section-intro', duration: 300, offset: 500 })
  .setTween('.site-section-intro .content-border', { rotation: 180 })
  .addTo(controller);
new ScrollMagic.Scene({ triggerElement: '.site-section-intro', duration: 300, offset: 800 })
  .setTween(timeline)
  .addTo(controller);
// AmplifyIt
new ScrollMagic.Scene({ triggerElement: '.site-section-amplifyit', duration: 1200 })
  .setClassToggle('.site-section-amplifyit', 'in-focus')
  .setPin('.site-section-amplifyit .section-content')
  .addTo(controller);
new ScrollMagic.Scene({ triggerElement: '.site-section-samsung', duration: 1200 })
  .setClassToggle('.site-section-samsung', 'in-focus')
  .setPin('.site-section-samsung .section-content')
  .addTo(controller);
new ScrollMagic.Scene({ triggerElement: '.site-section-graber', duration: 1200 })
  .setClassToggle('.site-section-graber', 'in-focus')
  .setPin('.site-section-graber .section-content')
  .addTo(controller);
/* eslint-enable no-console */
