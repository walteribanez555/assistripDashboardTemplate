import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'dateOnly' })
export class DateOnlyPipe implements PipeTransform {
  transform(value: string, format: string = 'yyyy-MM-dd', daysToAdd: number = 0): string | null {
    const datePipe = new DatePipe('en-US');
    let date = new Date(value);

    if (daysToAdd) {
      date.setDate(date.getDate() + daysToAdd);
    }

    return datePipe.transform(date, format);
  }
}
