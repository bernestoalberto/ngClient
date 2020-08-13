import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';


@Pipe({name: 'roundFullNumber' })
export class RoundFullNumber implements PipeTransform {
  transform(value: number): string {
    const newValue = value.toFixed(0);
    return newValue;
  }
}
