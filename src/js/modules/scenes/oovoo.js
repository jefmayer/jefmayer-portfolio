const oovoo = () => {
  // Fix for oovoo tablet scaling
  const oovooTabletWrapper = document.querySelector('.project-animation-oovoo .tablet-wrapper');
  if (oovooTabletWrapper) {
    const adjustTabletHeight = () => {
      oovooTabletWrapper.style.height = `${oovooTabletWrapper.offsetWidth * 0.7494}px`;
    };
    window.addEventListener('resize', adjustTabletHeight);
    adjustTabletHeight();
  }
};

export default oovoo;
