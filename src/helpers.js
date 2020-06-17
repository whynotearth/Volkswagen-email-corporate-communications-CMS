import { BASE_API } from '@/connection/api';
import { format, formatISO } from 'date-fns';
import { startCase, toLower } from 'lodash-es';
import store from './store';
import router from './router';

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
export function getPassiveEventConfig() {
  const isSupported = isPassiveEventsSupported();
  return isSupported ? { passive: true } : false;
}

export function isPassiveEventsSupported() {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
      }
    });

    window.addEventListener('testPassive', null, opts);

    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  return supportsPassive;
}

export function changeUrlExtension(url, newExtension) {
  const urlParts = url.split('.');
  const oldExtension = urlParts[urlParts.length - 1];
  if (oldExtension.length >= 5) {
    console.log('changeUrlExtension: Probably url has no extension.');
    return '';
  }
  const indexOfExtension = urlParts.length - 1;
  urlParts.splice(indexOfExtension, 1, newExtension);
  return urlParts.join('.');
}

export function transformCloudinaryUrl(resourceUrl, transformations) {
  if (!resourceUrl || !transformations || resourceUrl.indexOf('cloudinary') < 0) {
    return resourceUrl;
  }
  const urlParts = resourceUrl.split('/');

  const indexOfUpload = urlParts.indexOf('upload');
  urlParts.splice(indexOfUpload + 1, 0, transformations);
  return urlParts.join('/');
}

export function getPosterImage(videoUrl, transformations) {
  if (!videoUrl) {
    return null;
  }
  return transformCloudinaryUrl(changeUrlExtension(videoUrl, 'jpg'), transformations);
}

export function hasAudio(video) {
  return (
    video.mozHasAudio ||
    Boolean(video.webkitAudioDecodedByteCount) ||
    Boolean(video.audioTracks && video.audioTracks.length)
  );
}

export function getRandomsOf(items) {
  if (!(items.length > 0)) {
    return [];
  }
  return items.sort(() => 0.5 - Math.random());
}

export function APIPath(path) {
  return BASE_API + path;
}

export function formatDate(inputDate, dateFormat = 'dd MMM, yyyy') {
  if (!inputDate) {
    return '';
  }
  if (typeof inputDate === ('string' || 'number')) {
    inputDate = new Date(inputDate);
  }
  return format(inputDate, dateFormat);
}

export function formatISODate(inputDate) {
  if (!inputDate) {
    console.error('formatISO: Invalid Date');
  }
  if (typeof inputDate === ('string' || 'number')) {
    inputDate = new Date(inputDate);
  }
  return formatISO(inputDate);
}

export function cardDate(date) {
  const dateFormat = 'MMM D, YYYY';
  let formattedDate = '';
  if (date) {
    formattedDate = format(date, dateFormat);
  }
  return formattedDate;
}

export function reviewDateMonth(date) {
  const dateFormat = 'MMM D';
  let formattedDate = '';
  if (date) {
    formattedDate = format(date, dateFormat);
  }
  return formattedDate;
}
export function reviewDay(date) {
  const dateFormat = 'dddd';
  let formattedDate = '';
  if (date) {
    formattedDate = format(date, dateFormat);
  }
  return formattedDate;
}

export function setDocumentClassesOnToggleDialog(isOpen) {
  if (isOpen) {
    document.documentElement.classList.add('overflow-y-hidden', 'dialog--is-open');
  } else {
    document.documentElement.classList.remove('overflow-y-hidden', 'dialog--is-open');
  }
}

export function toFixedNumber(number, decimals) {
  return Number(number.toFixed(decimals));
}

export function getFormattedMetaDescription(text) {
  return text.substring(0, 180).trim();
}

export function getFormattedMetaTitle(text, { titleCase = true, maxLength = 80 } = {}) {
  let result = text;
  if (titleCase) {
    result = startCase(toLower(result));
  }
  return result.substring(0, maxLength).trim();
}

export function getAuthHeaders() {
  const JWTToken = store.getters['authKeep/token'];
  if (!JWTToken) {
    return;
  }
  return { Authorization: `Bearer ${JWTToken}` };
}

export async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function randomId() {
  return Math.random()
    .toString()
    .substr(2);
}

export async function showOverlayAndRedirect({ title = '', message = '', route, timeout = 1000 }) {
  store.commit('overlay/updateModel', {
    title,
    message
  });

  await sleep(1000);

  await router.push(route);

  store.commit('overlay/updateModel', {
    title: '',
    message: ''
  });
}

export function downloadBase64AsFile({ content, mimeType, fileName }) {
  var link = document.createElement('a');
  document.body.appendChild(link);
  link.setAttribute('type', 'hidden');
  link.href = `data:${mimeType};base64,` + content;
  link.download = fileName;
  link.click();
  document.body.removeChild(link);
}
