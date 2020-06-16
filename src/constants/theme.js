// This is exposing Tailwind config to JavaScript

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/../tailwind.config.js';
const config = resolveConfig(tailwindConfig);

export const theme = config.theme;
export const colors = theme.colors;
export const opacity = theme.opacity;
