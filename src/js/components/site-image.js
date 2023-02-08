import breakpoints from '../utils/breakpoints';

export default class SiteImage {
  constructor(options) {
    this.element = options.element;
    this.isLoaded = options.isLoaded;
    this.loadStarted = options.loadStarted;
  }

  getBreakpointLabel() {
    const { innerWidth } = window;
    const div = this.element;
    // Only those breakpoints under the window width
    const arr = breakpoints.filter(item => item.value <= innerWidth);
    arr.reverse();
    // Then starting w/ the widest width, see what attributes that image has
    let attrLabel = 'data-src';
    arr.forEach((item) => {
      const { label } = item;
      if (div.getAttribute(`data-${label}-src`) !== null && attrLabel === 'data-src') {
        attrLabel = `data-${label}-src`;
      }
    });
    return attrLabel;
  }

  loadImg(onComplete) {
    const div = this.element;
    const img = document.createElement('img');
    const srcAttr = this.getBreakpointLabel();
    const dataSection = div.getAttribute('data-section');
    const hiResSrc = div.getAttribute('data-hires-src');
    const that = this;
    const onLoadComplete = () => {
      that.isLoaded = true;
      if (onComplete) {
        onComplete();
      }
      img.removeEventListener('load', onLoadComplete);
    };
    if (hiResSrc !== null) {
      img.setAttribute('data-hires-src', hiResSrc);
    }
    img.setAttribute('data-section', dataSection);
    img.src = div.getAttribute(srcAttr);
    img.alt = div.getAttribute('data-alt');
    img.className = 'site-asset';
    div.parentNode.appendChild(img);
    div.parentNode.removeChild(div);
    // Load image
    this.loadStarted = true;
    img.addEventListener('load', onLoadComplete);
  }
}
