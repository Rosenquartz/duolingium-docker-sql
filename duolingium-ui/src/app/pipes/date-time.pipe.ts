import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let minutes = Math.floor(value/360);
    let seconds = Math.floor(value/10)%60;
    let milli = Math.floor(value%10);
    let returnString = '';
    returnString += String(minutes).padStart(2, '0');
    returnString += ':';
    returnString += String(seconds).padStart(2, '0');
    returnString += '.';
    returnString += String(milli)
    return returnString;
  }

}
