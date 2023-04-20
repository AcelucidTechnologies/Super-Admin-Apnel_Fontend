import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {

  transform(value: any) {
    return value.replace(/<[^>]*>/g, '');
  }

}
