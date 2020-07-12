import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatIdString',
})
export class FormatIdStringPipe implements PipeTransform {
  public transform(value: string): string {
    return value?.replace(' ', '-');
  }
}
