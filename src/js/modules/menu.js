/* eslint-disable no-console */
import smoothscroll from 'smoothscroll-polyfill';
import { getActiveSectionName } from '../modules/loaders/state';

smoothscroll.polyfill();

/* const getSceneStartOffsetPos = sceneName => (
  document.querySelector(`.project-animation-${sceneName}`).offsetTop - (window.innerHeight / 2)
); */

const setActiveMenuState = (btn) => {
  const navHightlight = document.querySelector('.nav-highlight');
  navHightlight.style.top = `${btn.offsetTop}px`;
  navHightlight.classList.add('active');
  const navBtn = document.querySelector('.scene-navigation-btn.active');
  if (navBtn) {
    navBtn.classList.remove('active');
  }
  btn.classList.add('active');
};

const initMenu = (data) => {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const body = document.querySelector('body');
  const menuActiveClass = 'nav-menu-open';
  const menuAnimatelass = 'nav-menu-animate';
  const navHightlight = document.querySelector('.nav-highlight');
  const sectionNavItems = document.querySelectorAll('.nav-menu button');

  // let navItemClicked = false;
  let activeMenuItem = '';

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

  const onBodyClickHandler = (event) => {
    if (!event.target.closest('.site-nav')) {
      updateMenuState(); /* eslint-disable-line no-use-before-define */
    }
  };

  const updateMenuState = () => {
    if (body.classList.contains(menuActiveClass)) {
      removeActiveClass();
      body.removeEventListener('click', onBodyClickHandler);
    } else {
      addActiveClass();
      body.addEventListener('click', onBodyClickHandler);
    }
  };

  const getSceneOffsetPos = sceneName => (
    document.querySelector(`.project-details-${sceneName}`).offsetTop - (window.innerHeight - document.querySelector(`.project-details-${sceneName}`).offsetHeight)
  );

  /* const onWindowScroll = () => {
    if (navItemClicked) {
      return;
    }
    if (window.pageYOffset < 565 && body.classList.contains(menuActiveClass)) {
      removeActiveClass();
    }
    for (let i = data.length - 1; i >= 0; i--) {
      if (getSceneStartOffsetPos(data[i].name) <= window.pageYOffset) {
        activeMenuItem = data[i].name;
        const btn = document.querySelector(`.nav-menu [data-scene-name="${activeMenuItem}"]`);
        setActiveMenuState(btn);
        return;
      }
    }
  }; */

  /* const handleWindowScroll = () => {
    setTimeout(() => {
      if (body.classList.contains(menuActiveClass)) {
        onWindowScroll();
        window.addEventListener('scroll', onWindowScroll, { passive: true });
      } else {
        window.removeEventListener('scroll', onWindowScroll);
      }
    }, 100);
  }; */

  menuBtn.addEventListener('click', () => {
    updateMenuState();
    // handleWindowScroll();
  });

  const scrollToPosition = (pos) => {
    window.scrollTo({
      top: pos,
      behavior: 'smooth',
    });
  };

  [].map.call(sectionNavItems, btn => (
    btn.addEventListener('mouseover', () => {
      setActiveMenuState(btn);
    })
  ));

  [].map.call(sectionNavItems, btn => (
    btn.addEventListener('mouseout', () => {
      if (activeMenuItem !== '') {
        const activeBtn = document.querySelector(`.nav-menu [data-scene-name="${activeMenuItem}"]`);
        setActiveMenuState(activeBtn);
      } else {
        navHightlight.classList.remove('active');
      }
    })
  ));

  [].map.call(sectionNavItems, btn => (
    btn.addEventListener('click', () => {
      console.log(data);
      const sceneName = btn.getAttribute('data-scene-name');
      const pos = getSceneOffsetPos(sceneName);
      scrollToPosition(pos);
      activeMenuItem = sceneName;
      // navItemClicked = true;
      setActiveMenuState(btn);
      /* setTimeout(() => {
        navItemClicked = false;
      }, 1000); */
    })
  ));
  // Intro button event handler
  const introButton = document.querySelector('.scroll-indicator-animation');
  introButton.addEventListener('click', () => {
    const sceneName = introButton.getAttribute('data-scene-name');
    const pos = getSceneOffsetPos(sceneName);
    scrollToPosition(pos);
    activeMenuItem = sceneName;
    // navItemClicked = true;
    const btn = document.querySelector(`.nav-menu [data-scene-name="${activeMenuItem}"]`);
    setActiveMenuState(btn);
    /* setTimeout(() => {
      navItemClicked = false;
    }, 1000); */
  });
};

const updateMenu = (data) => {
  const activeSection = getActiveSectionName(data);
  if (activeSection) {
    const selector = `.nav-menu [data-scene-name="${activeSection.name}"]`;
    const btn = document.querySelector(selector);
    setActiveMenuState(btn);
  }
};

export {
  initMenu,
  updateMenu,
};
/* eslint-enable no-console */
