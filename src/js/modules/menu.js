/* eslint-disable no-console */
const menu = () => {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const body = document.querySelector('body');
  const menuActiveClass = 'nav-menu-open';

  menuBtn.addEventListener('click', () => {
    if (body.classList.contains(menuActiveClass)) {
      body.classList.remove(menuActiveClass);
    } else {
      body.classList.add(menuActiveClass);
    }
  });
};

export default menu;
/* eslint-enable no-console */
