/* eslint-disable no-console */
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

const createTumblrTweens = () => {
  const cards = document.querySelectorAll('.project-animation-tumblr .info-card');
  const tweens = [];
  const interval = 0.125;
  let offset = 0;
  for (let i = 0; i < cards.length; i++) { /* eslint-disable-line no-plusplus */
    const timeline = new TimelineLite();
    const cardDiv = cards[i].querySelector('.info-card-inner');
    const contentDiv = cards[i].querySelector('.content-wrapper');
    timeline.fromTo(cardDiv, 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, offset);
    timeline.fromTo(contentDiv, 0.5, { opacity: 0 }, { opacity: 1 }, offset + interval);
    tweens.push(timeline);
    offset += interval;
  }
  return tweens;
};

export {
  createTrainspottedTweens,
  createTumblrTweens,
};
/* eslint-enable no-console */
