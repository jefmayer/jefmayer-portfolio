/* eslint-disable no-console */
const tumblr = () => {
  const createDisplayNumber = (num) => {
    if (num.toString().length > 3) {
      return num.toString().replace(/\B(?=(\d)+(?!\d))/, ',');
    }
    return num;
  };

  const cardWrapper = document.querySelector('.project-animation-tumblr .info-card-wrapper');
  const getWhiteSoxLosses = () => {
    const url = 'https://lookup-service-prod.mlb.com/json/named.team_seas_results.bam?team_id=145';
    const cardTotal = cardWrapper.querySelector('.info-card-sox .card-total');
    const fromYear = 2007;
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const response = JSON.parse(request.responseText);
        const records = response.team_seas_results.queryResults.row;
        const losses = records.reduce((acc, current) => {
          if (current.season >= fromYear) {
            return acc + parseInt(current.l, 10);
          }
          return acc;
        }, 0);
        cardTotal.textContent = createDisplayNumber(losses);
      }
    };
    request.onerror = () => {
      cardTotal.textContent = 'N/A';
    };
    request.send();
  };

  const getDiscogsData = () => {
    const url = 'https://api.discogs.com/users/mode78';
    const cardTotal = cardWrapper.querySelector('.info-card-vinyl .card-total');
    const recWgt = 0.264555;
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const response = JSON.parse(request.responseText);
        const num = parseInt(response.num_collection, 10);
        cardTotal.textContent = createDisplayNumber(Math.round(num * recWgt));
      }
    };
    request.onerror = () => {
      cardTotal.textContent = 'N/A';
    };
    request.send();
  };

  const getTransformers = () => {
    const cardTotal = cardWrapper.querySelector('.info-card-prime .card-total');
    cardTotal.textContent = createDisplayNumber(30);
  };

  const getInterval = (time) => {
    let num = 0;
    switch (time) {
      case 'hours':
        num = 1000 * 60 * 60;
        break;
      case 'days':
        num = 1000 * 60 * 60 * 24;
        break;
      case 'years':
        num = 1000 * 60 * 60 * 24 * 365;
        break;
      default:
        num = 0;
    }
    return num;
  };

  const getTimeSince = (date1, date2, interval) => (
    Math.ceil((date1.getTime() - new Date(date2).getTime()) / interval)
  );

  getWhiteSoxLosses();
  getDiscogsData();
  getTransformers();
  // For items w/ start-date
  const cards = cardWrapper.querySelectorAll('[data-startdate][data-interval]');
  const today = new Date();
  for (let i = 0; i < cards.length; i++) { /* eslint-disable-line no-plusplus */
    const startDate = cards[i].getAttribute('data-startdate');
    const interval = cards[i].getAttribute('data-interval');
    const time = getTimeSince(today, startDate, getInterval(interval));
    const cardTotal = cards[i].querySelector('.card-total');
    cardTotal.textContent = createDisplayNumber(time);
  }
};

export default tumblr;
/* eslint-enable no-console */
