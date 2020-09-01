/* eslint-disable no-console */
const sceneNavigation = () => {
  const scrollToPosition = (pos) => {
    window.scrollTo({
      top: pos,
      behavior: 'smooth',
    });
  };

  // continue and project buttons
  [].map.call(document.querySelectorAll('.scene-navigation-btn'), btn => (
    btn.addEventListener('click', () => {
      const sceneName = btn.getAttribute('data-scene-name');
      const sceneTop = document.querySelector(`.project-animation-${sceneName}`).offsetTop;
      const sceneOffset = document.querySelector(`.project-details-${sceneName}`).offsetHeight;
      // console.log(`${sceneTop}/${sceneOffset}`);
      scrollToPosition(sceneTop + sceneOffset);
    })
  ));
};

export default sceneNavigation;
/* eslint-enable no-console */
