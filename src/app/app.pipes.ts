import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({ name: 'objectKeys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for (const key of value) {
      keys.push({ key, value: value[key] });
    }
    return keys;
  }
}
@Pipe({ name: 'bcAddCommas' })
export class AddCommasPipe implements PipeTransform {
  transform(authors: null | string[]) {
    if (!authors) {
      return 'Author Unknown';
    }

    switch (authors.length) {
      case 0:
        return 'Author Unknown';
      case 1:
        return authors[0];
      case 2:
        return authors.join(' and ');
      default:
        const last = authors[authors.length - 1];
        const remaining = authors.slice(0, -1);
        return `${remaining.join(', ')}, and ${last}`;
    }
  }
}
@Pipe({ name: 'bcEllipsis' })
export class EllipsisPipe implements PipeTransform {
  transform(str: string, strLength: number = 250) {
    const withoutHtml = str.replace(/(<([^>]+)>)/gi, '');

    if (str.length >= strLength) {
      return `${withoutHtml.slice(0, strLength)}...`;
    }

    return withoutHtml;
  }
}
@Pipe({ name: 'replaceName' })
export class ReplaceName implements PipeTransform {
  transform(value: string): string {
    const newValue = value.toLowerCase().replace('balanced', '').replace('control', '');
    return `${newValue}`;
  }
}

@Pipe({ name: 'roundFullNumber' })
export class RoundFullNumber implements PipeTransform {
  transform(value: number): string {
    const newValue = value.toFixed(0);
    return newValue;
  }
}

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

@Pipe({ name: 'search', pure: false })
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

@Pipe({ name: 'ucfirst' })
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


@Pipe({ name: 'unique', pure: false })
export class UniquePipe implements PipeTransform {
  transform(value: any, key: string): any {
    if (value !== undefined && value !== null) {
      return _.uniqBy(value, key);
    }
    return value;
  }
}
