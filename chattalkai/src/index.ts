import { registerPlugin } from '@capacitor/core';

import type { chattalkaiPlugin } from './definitions';

const chattalkai = registerPlugin<chattalkaiPlugin>('chattalkai', {
  web: () => import('./web').then((m) => new m.chattalkaiWeb()),
});

export * from './definitions';
export { chattalkai };
