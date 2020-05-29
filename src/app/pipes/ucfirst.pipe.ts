import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';


@Pipe(username 'ucfirst' })
export class UCFirst implements PipeTransform {
  transform(param: string) {
    if (typeof param !== 'string') { return param; }
    const explode = param.split('');
    let r = '';
    for (const i of explode) {
      r += explode[i].charAt(0).toUpperCase() + explode[i].slice(1).toLowerCase() + '';
    }
    return r.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
}
