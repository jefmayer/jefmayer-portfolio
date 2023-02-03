/* eslint-disable no-console */
const tumblr = () => {
  const createDisplayNumber = (num) => {
    if (num.toString().length > 3) {
      return num.toString().replace(/\B(?=(\d)+(?!\d))/, ',');
    }
    return num;
  };

  const cardWrapper = document.querySelector('.project-animation-tumblr .info-card-wrapper');
  const date = new Date();
  const currentYear = date.getFullYear();
  let winTotal = 0;

  const getWinsDataByTeam = (data) => {
    let teamWins = 0;
    data.records.forEach((record) => {
      if (record.division.id === 202) {
        record.teamRecords.forEach((teamData) => {
          if (teamData.team.id === 145) {
            const { wins } = teamData;
            teamWins = wins;
          }
        });
      }
    });
    return teamWins;
  };

  const getStandingsDatByYear = (year) => {
    const url = `https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=${year}&standingsTypes=regularSeason`;
    const cardTotal = cardWrapper.querySelector('.info-card-sox .card-total');
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const response = JSON.parse(request.responseText);
        winTotal += getWinsDataByTeam(response);
        // Check next year's data
        const nextYear = year + 1;
        if (nextYear <= currentYear) {
          getStandingsDatByYear(nextYear);
        } else {
          cardTotal.textContent = createDisplayNumber(winTotal);
        }
      }
    };
    request.onerror = () => {
      cardTotal.textContent = 'N/A';
    };
    request.send();
  };

  const getWhiteSoxLosses = () => {
    getStandingsDatByYear(2020);
  };

  const getDiscogsData = () => {
    const url = 'https://api.discogs.com/users/jefmayer';
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
    cardTotal.textContent = createDisplayNumber(37);
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
