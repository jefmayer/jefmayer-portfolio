/* eslint-disable no-console */
const menu = () => {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const body = document.querySelector('body');
  const menuActiveClass = 'nav-menu-open';
  const menuAnimatelass = 'nav-menu-animate';
  const navHightlight = document.querySelector('.nav-highlight');
  const sectionNavItems = document.querySelectorAll('.nav-menu button');

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
    // Add active state to nav item based on scroll position
    for (let i = sectionNavItems.length - 1; i >= 0; i--) { /* eslint-disable-line no-plusplus */
      //
    }
  });

  [].map.call(sectionNavItems, btn => (
    btn.addEventListener('mouseover', () => {
      navHightlight.style.top = `${btn.offsetTop}px`;
      navHightlight.classList.add('active');
    })
  ));
  [].map.call(sectionNavItems, btn => (
    btn.addEventListener('mouseout', () => {
      navHightlight.classList.remove('active');
    })
  ));
};

export default menu;
/* eslint-enable no-console */
