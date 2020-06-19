import { getPassiveEventConfig } from '../helpers';

const SVG_NORM = 'http://www.w3.org/2000/svg';

const EVENT_START = 'mousedown';
const EVENT_END = 'mouseup';

const TIMING = 300;

const getPosition = el => {
  const computedStyle = window.getComputedStyle(el);

  if (computedStyle.position === 'static') {
    return 'relative';
  }

  return computedStyle.position;
};

const createRippleGrow = (el, svg) => {
  return event => {
    const rect = el.getBoundingClientRect();

    const x = event.offsetX;
    const y = event.offsetY;
    const w = el.offsetWidth;
    const h = el.offsetHeight;

    const offsetX = Math.abs(w / 2 - x);
    const offsetY = Math.abs(h / 2 - y);
    const deltaX = w / 2 + offsetX;
    const deltaY = h / 2 + offsetY;
    const scale = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    const g = document.createElementNS(SVG_NORM, 'g');
    g.setAttribute('viewBox', '0 0 100 100');
    g.setAttribute('width', '100');
    g.setAttribute('height', '100');
    g.style.transform = `translate(${x}px, ${y}px)`;
    svg.appendChild(g);

    const circle = document.createElementNS(SVG_NORM, 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '1');
    g.appendChild(circle);

    el.appendChild(svg);

    requestAnimationFrame(() => {
      g.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    });
  };
};

const createRippleFade = (el, svg, opacity = '') => {
  return event => {
    svg.style.opacity = '0';

    setTimeout(() => {
      while (svg.firstChild) {
        svg.removeChild(svg.lastChild);
      }
      svg.classList.add('disable');
      svg.style.opacity = '';
      svg.classList.remove('disable');
    }, TIMING);
  };
};

const Ripple = {
  inserted(el, { value: { fill, opacity } = {} }) {
    el.style.position = getPosition(el);

    const svg = document.createElementNS(SVG_NORM, 'svg');
    svg.setAttribute('xmlns', SVG_NORM);
    svg.setAttribute('focusable', 'false');
    svg.classList.add('ripples');
    el.appendChild(svg);

    if (fill) {
      svg.style.fill = fill;
    }

    if (opacity) {
      svg.style.opacity = opacity;
    }

    el.rippleGrow = createRippleGrow(el, svg);
    el.rippleFade = createRippleFade(el, svg, opacity);

    el.addEventListener(EVENT_START, el.rippleGrow, getPassiveEventConfig());
    el.addEventListener(EVENT_END, el.rippleFade, getPassiveEventConfig());
  },
  unbind(el) {
    el.removeEventListener(EVENT_START, el.rippleGrow);
    el.removeEventListener(EVENT_END, el.rippleFade);
  }
};

export default Ripple;
