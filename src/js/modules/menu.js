/* eslint-disable no-console */
const menu = () => {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const body = document.querySelector('body');
  const menuActiveClass = 'nav-menu-open';
  const menuAnimatelass = 'nav-menu-animate';
  const navHightlight = document.querySelector('.nav-highlight');

  const removeActiveClass = () => {
    body.classList.remove(menuAnimatelass);
    setTimeout(() => {
      body.classList.remove(menuActiveClass);
    }, 100);
  };

  const addActiveClass = () => {
    body.classList.add(menuActiveClass);
    setTimeout(() => {
      body.classList.add(menuAnimatelass);
    }, 100);
  };

  const updateMenuState = () => {
    if (body.classList.contains(menuActiveClass)) {
      removeActiveClass();
    } else {
      addActiveClass();
    }
  };

  menuBtn.addEventListener('click', () => {
    updateMenuState();
  });

  window.addEventListener('scroll', () => {
    if (window.pageYOffset < 565 && body.classList.contains(menuActiveClass)) {
      removeActiveClass();
    }
  });

  [].map.call(document.querySelectorAll('.nav-menu button'), btn => (
    btn.addEventListener('mouseover', () => {
      navHightlight.style.top = `${btn.offsetTop}px`;
      navHightlight.classList.add('active');
    })
  ));
  [].map.call(document.querySelectorAll('.nav-menu button'), btn => (
    btn.addEventListener('mouseout', () => {
      navHightlight.classList.remove('active');
    })
  ));
};

export default menu;
/* eslint-enable no-console */
