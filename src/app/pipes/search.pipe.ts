import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({name: 'search', pure: false })
export class Search implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) { return items; }
    if (filter.indexOf('::') !== -1) {
      const filtr = filter.split('::');
      return items.filter((item) => {
        const sItem = JSON.stringify(item[filtr[0]]).toLocaleLowerCase();
        if (filtr[1].charCodeAt(0) === '!') {
          return (new RegExp('(?s)^((?!' + filtr[1].toLocaleLowerCase()).test(sItem) + ').)*$') ? item : null;
        } else { }
        return (new RegExp(filtr[1].toLocaleLowerCase()).test(sItem)) ? item : null;
      });
    } else {
      return items.filter((item) => {
        const sItem = JSON.stringify(item).toLocaleLowerCase();
        return (new RegExp(filter.toLocaleLowerCase()).test(sItem)) ? item : null;
      });
    }
  }
}
