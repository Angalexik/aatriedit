import 'normalize.css';
import './global.css';

import Iconify from '@iconify/iconify/dist/iconify.without-api.min.js';
import { mdiClose } from '@mdi/js';

import App from './App.svelte';

Iconify.addIcon('mdi:close', {
	body: `<path d="${mdiClose}" fill="currentColor/>"`,
	width: 24,
	height: 24,
});

const app = new App({
	target: document.body,
});

export default app;
