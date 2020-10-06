/* eslint-disable no-console */
const menu = () => {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const body = document.querySelector('body');
  const menuActiveClass = 'nav-menu-open';
  const menuAnimatelass = 'nav-menu-animate';
  const navHightlight = document.querySelector('.nav-highlight');
  const sectionNavItems = document.querySelectorAll('.nav-menu button');

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

  const sceneNames = [];
  const sceneNavBtns = document.querySelectorAll('.nav-menu .scene-navigation-btn');
  for (let i = 0; i < sceneNavBtns.length; i++) { /* eslint-disable-line no-plusplus */
    sceneNames.push(sceneNavBtns[i].getAttribute('data-scene-name'));
  }
  // console.log(sceneNames);

  const setActiveMenuState = (btn) => {
    navHightlight.style.top = `${btn.offsetTop}px`;
    navHightlight.classList.add('active');
  };

  const getSceneOffsetPos = (sceneName) => {
    const sceneTop = document.querySelector(`.project-animation-${sceneName}`).offsetTop;
    /* const sceneDetails = document.querySelector(`.project-details-${sceneName}`);
    let sceneOffset = 0;
    if (sceneDetails !== null) {
      sceneOffset = sceneDetails.offsetHeight;
    } */
    return sceneTop; // + sceneOffset;
  };

  window.addEventListener('scroll', () => {
    // console.log(`ypos: ${window.pageYOffset}`);
    for (let i = sceneNames.length - 1; i >= 0; i--) { /* eslint-disable-line no-plusplus */
      if (getSceneOffsetPos(sceneNames[i]) <= window.pageYOffset) {
        // console.log(`${sceneNames[i]}: ${getSceneOffsetPos(sceneNames[i])}`);
        activeMenuItem = sceneNames[i];
        const btn = document.querySelector(`.nav-menu [data-scene-name="${activeMenuItem}"]`);
        setActiveMenuState(btn);
        return;
      }
    }
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
    })
  ));
};

export default menu;
/* eslint-enable no-console */
