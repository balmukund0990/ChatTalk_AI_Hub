import { WebPlugin } from '@capacitor/core';

import type { chattalkaiPlugin } from './definitions';

export class chattalkaiWeb extends WebPlugin implements chattalkaiPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
