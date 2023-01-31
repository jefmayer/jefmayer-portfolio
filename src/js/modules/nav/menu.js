/* eslint-disable no-console */
import smoothscroll from 'smoothscroll-polyfill';
import { getActiveSectionName, updateSiteData } from '../../state/state';

smoothscroll.polyfill();

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

const initMenu = () => {
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

  menuBtn.addEventListener('click', () => {
    updateMenuState();
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
      const activeMenuItem = getActiveSectionName();
      if (activeMenuItem) {
        const activeBtn = document.querySelector(`.nav-menu [data-scene-name="${activeMenuItem.name}"]`);
        setActiveMenuState(activeBtn);
      } else {
        navHightlight.classList.remove('active');
      }
    })
  ));

  [].map.call(sectionNavItems, btn => (
    btn.addEventListener('click', () => {
      const sceneName = btn.getAttribute('data-scene-name');
      updateSiteData({
        isActive: true,
        name: sceneName,
      });
      const pos = getSceneOffsetPos(sceneName);
      scrollToPosition(pos);
      setActiveMenuState(btn);
    })
  ));
  // Intro button event handler
  const introButton = document.querySelector('.scroll-indicator-animation');
  introButton.addEventListener('click', () => {
    const sceneName = introButton.getAttribute('data-scene-name');
    updateSiteData({
      isActive: true,
      name: sceneName,
    });
    const pos = getSceneOffsetPos(sceneName);
    scrollToPosition(pos);
    const btn = document.querySelector(`.nav-menu [data-scene-name="${sceneName}"]`);
    setActiveMenuState(btn);
  });
};

const updateMenu = () => {
  const activeSection = getActiveSectionName();
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
