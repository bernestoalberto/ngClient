import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replaceName' })
export class ReplaceName implements PipeTransform {
  transform(value: string): string {
    const newValue = value.toLowerCase().replace('balanced', '').replace('control', '');
    return `${newValue}`;
  }
}
