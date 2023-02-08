import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';

const createTrainspottedTweens = () => {
  const getFullLineWidth = (lines) => {
    let total = 0;
    for (let i = 1; i < lines.length; i++) { /* eslint-disable-line no-plusplus */
      total += parseFloat(lines[i].style.width, 10);
    }
    return total;
  };
  // If more than one marker (should always be the case) only animate in > 1
  const addMarkerAnimationsToTimeline = (row, totalWidth) => {
    const lines = row.querySelectorAll('.sighting-connector');
    const markers = row.querySelectorAll('.sighting-marker');
    const timeline = new TimelineLite();
    for (let i = 1; i < lines.length; i++) { /* eslint-disable-line no-plusplus */
      const width = parseFloat(lines[i].style.width, 10);
      // console.log(`${width}/${totalWidth}`);
      timeline.fromTo(lines[i], width / totalWidth, { scaleX: 0 }, { scaleX: 1 });
      timeline.set(markers[i], { className: '+=sighting-marker' });
    }
    return timeline;
  };
  const table = document.querySelector('.project-animation-trainspotted .data-table');
  const tableRows = table.querySelectorAll('.y-axis-row');
  const tweens = [];
  // Need to find longest line
  let lineLength = 0;
  for (let i = 0; i < tableRows.length; i++) { /* eslint-disable-line no-plusplus */
    lineLength = Math.max(lineLength, getFullLineWidth(tableRows[i].querySelectorAll('.sighting-connector')));
  }
  for (let i = 0; i < tableRows.length; i++) { /* eslint-disable-line no-plusplus */
    tweens.push(addMarkerAnimationsToTimeline(tableRows[i], lineLength));
  }
  return tweens;
};

const trainspottedScene = (controller) => {
  const timelines = {
    trainspottedElements: new TimelineLite()
      .fromTo('.project-animation-trainspotted .content-wrapper', 0.5, { visibility: 'hidden', y: '75%' }, { visibility: 'visible', y: '0%' })
      .add('yAxisAnimations')
      .set('#active-marker-trigger', { className: '+=active sighting-marker' }, 1.125)
      .fromTo('.project-animation-trainspotted .visualization-overlay', 0.25, { visibility: 'hidden', scale: 0.85 }, { visibility: 'visible', scale: 1 }, 1.375)
      .fromTo('.project-animation-trainspotted .data-visualization', 0.25, { opacity: 1 }, { opacity: 0.25 }, 1.375),
  };

  const { trainspottedElements } = timelines;
  trainspottedElements.add(createTrainspottedTweens(), 'yAxisAnimations-=.475', 'sequence', -0.25);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-trainspotted',
    duration: 1200,
  }).setClassToggle('.project-animation-trainspotted', 'in-focus')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-trainspotted',
    duration: 1200,
  }).setClassToggle('body', 'project-trainspotted')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-trainspotted',
    duration: 250,
    triggerHook: 0,
  }).setPin('.project-animation-trainspotted .section-content')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '.project-animation-trainspotted',
    duration: 750,
  }).setTween(timelines.trainspottedElements)
    .addTo(controller);
};

export default trainspottedScene;
