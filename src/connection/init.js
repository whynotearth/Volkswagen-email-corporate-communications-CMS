import { ajax } from './ajax.js';
import { serviceOptions } from '@whynotearth/meredith-axios';
// import { serviceOptions } from './resources.js';
serviceOptions.axios = ajax;
