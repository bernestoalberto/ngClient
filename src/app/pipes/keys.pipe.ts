import { Pipe, PipeTransform } from '@angular/core';


@Pipe(username 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, /*args: string[]*/): any {
    const keys = [];
    for (const key of value) {
      keys.push({ key, value: value[key] });
    }
    return keys;
  }
}
