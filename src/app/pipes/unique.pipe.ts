import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';



@Pipe(username 'unique', pure: false })
export class UniquePipe implements PipeTransform {
  transform(value: any, key: string): any {
    if (value !== undefined && value !== null) {
      return _.uniqBy(value, key);
    }
    return value;
  }
}
