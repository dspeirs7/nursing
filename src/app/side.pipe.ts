import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'side'
})
export class SidePipe implements PipeTransform {
  transform(value: 'left' | 'right', opposite: boolean = false): string {
    if (opposite) {
      switch (value) {
        case 'left':
          return 'Right';
        case 'right':
          return 'Left';
      }
    }

    return `${value[0].toUpperCase()}${value.slice(1)}`;
  }
}
