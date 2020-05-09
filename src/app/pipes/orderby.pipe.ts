import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';



@Pipe({ name: 'orderBy' })
export class OrderBy implements PipeTransform {

  value: string[] = [];

  static _orderByComperator(a: any, b: any) {
    if (a === null || typeof a === 'undefined') { a = 0; }
    if (b === null || typeof b === 'undefined') { b = 0; }

    if (isNaN(parseFloat(a)) || !isFinite(a) || isNaN(parseFloat(b)) || !isFinite(b)) {
      if (a.toLowerCase() < b.toLowerCase()) { return -1; }
      if (a.toLowerCase() > b.toLowerCase()) { return 1; }
    } else {
      if (parseFloat(a) < parseFloat(b)) { return -1; }
      if (parseFloat(a) > parseFloat(b)) { return 1; }
    }
    return 0;
  }
  transform(input: any, config: string = '+') {
    this.value = [...input];
    const value = this.value;

    if (!Array.isArray(value)) { return value; }

    if (!Array.isArray(config) || Array.isArray(config) && config.length === 1) {
      const propertyToCheck: string = !Array.isArray(config) ? config : config[0];
      const descending = propertyToCheck.substr(0, 1) === '-';

      if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
        return !descending ? value.sort() : value.sort().reverse();
      } else {
        const property: string = propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
          ? propertyToCheck.substr(1) : propertyToCheck;

        return value.sort((a: any, b: any) => {
          return !descending ? OrderBy._orderByComperator(a[property], b[property]) : -OrderBy._orderByComperator(a[property], b[property]);
        });
      }
    } else {
      return value.sort((a: any, b: any) => {
        for (const i of config) {
          let descending = '';
          if (config[i].substr(0, 1) === '-') {
            descending = config[i].substr(0, 1);
          }
          let property = '';
          if (config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-') {
            property = config[i].substr(1);
          } else {
            property = config[i];
          }
          let comparison;
          if (!descending) {
            comparison = OrderBy._orderByComperator(a[property], b[property]);
          } else {
            comparison = OrderBy._orderByComperator(a[property], b[property]);
          }

          if (comparison !== 0) {
            return comparison;
          }
        }
        return 0;
      });
    }
  }
}