/* eslint-disable no-console */
const menu = () => {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const body = document.querySelector('body');
  const menuActiveClass = 'nav-menu-open';
  const menuAnimatelass = 'nav-menu-animate';
  const navHightlight = document.querySelector('.nav-highlight');
  const sectionNavItems = document.querySelectorAll('.nav-menu button');

  let navItemClicked = false;
  let activeMenuItem = '';

  const sceneNames = [];
  const sceneNavBtns = document.querySelectorAll('.nav-menu .scene-navigation-btn');
  for (let i = 0; i < sceneNavBtns.length; i++) { /* eslint-disable-line no-plusplus */
    sceneNames.push(sceneNavBtns[i].getAttribute('data-scene-name'));
  }

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

  const setActiveMenuState = (btn) => {
    navHightlight.style.top = `${btn.offsetTop}px`;
    navHightlight.classList.add('active');
    const navBtn = document.querySelector('.scene-navigation-btn.active');
    if (navBtn) {
      navBtn.classList.remove('active');
    }
    btn.classList.add('active');
  };

  const getSceneStartOffsetPos = sceneName => (
    document.querySelector(`.project-animation-${sceneName}`).offsetTop - (window.innerHeight / 2)
  );

  const getSceneOffsetPos = sceneName => (
    document.querySelector(`.project-details-${sceneName}`).offsetTop - (window.innerHeight - document.querySelector(`.project-details-${sceneName}`).offsetHeight)
  );

  const onWindowScroll = () => {
    if (navItemClicked) {
      return;
    }
    if (window.pageYOffset < 565 && body.classList.contains(menuActiveClass)) {
      removeActiveClass();
    }
    for (let i = sceneNames.length - 1; i >= 0; i--) { /* eslint-disable-line no-plusplus */
      if (getSceneStartOffsetPos(sceneNames[i]) <= window.pageYOffset) {
        // console.log(`${window.pageYOffset}/${getSceneStartOffsetPos(sceneNames[i])}`);
        activeMenuItem = sceneNames[i];
        const btn = document.querySelector(`.nav-menu [data-scene-name="${activeMenuItem}"]`);
        setActiveMenuState(btn);
        return;
      }
    }
  };

  const handleWindowScroll = () => {
    setTimeout(() => {
      if (body.classList.contains(menuActiveClass)) {
        onWindowScroll();
        window.addEventListener('scroll', onWindowScroll);
      } else {
        window.removeEventListener('scroll', onWindowScroll);
      }
    }, 100);
  };

  menuBtn.addEventListener('click', () => {
    updateMenuState();
    handleWindowScroll();
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
      const sceneName = btn.getAttribute('data-scene-name');
      const pos = getSceneOffsetPos(sceneName);
      scrollToPosition(pos);
      activeMenuItem = sceneName;
      navItemClicked = true;
      setActiveMenuState(btn);
      setTimeout(() => {
        navItemClicked = false;
      }, 1000);
    })
  ));
};

export default menu;
/* eslint-enable no-console */
