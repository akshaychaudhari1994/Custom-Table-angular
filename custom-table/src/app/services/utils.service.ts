import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  isObject(val: any): boolean {
    if (typeof val === 'object' &&
      !Array.isArray(val) &&
      val !== null) {
      return true;
    } else {
      return false;
    }
  }

  dateFormate(val: any, format: any): string {
    if (val?.toString()?.length === 10) val = val * 1000;
    return moment(new Date(val)).format(format);
  }

  commaSeparateValue(val: any) {
    return val.split(',');
  }

  getUnmatchedJsonEmt(array1: any, array2: any, filedName: any) {
    return array1.filter((item: any) => !array2.some((_item: any) => _item[filedName] === item[filedName]))
  }

  nestedObjectValue(obj: any, propString: any) {
    if (!propString)
      return obj;

    var prop, props = propString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];

      var candidate = obj[prop];
      if (candidate !== undefined && candidate) {
        obj = candidate;
      } else {
        break;
      }
    }
    if (propString === 'price.amount' && obj[props[i]] && !(obj[props[i]]).match(',')) {
      obj[props[i]] = (+obj[props[i]]).toLocaleString('en-IN');
    };

    return obj[props[i]];
  }

  getPercentage(totalCount: number, actualCount: number) {
    return (100 * actualCount) / totalCount;
  }

  addZero(value: number) {
    return ("0" + value.toString()).slice(-2);
  }

  formatTime(time: any) {
    let tTime = `${time.hour > 12 ? this.addZero(time.hour - 12) : this.addZero(time.hour)}:${this.addZero(time.minute)} ${time.hour >= 12 ? 'PM' : 'AM'}`;
    if (tTime === '00:00 AM') tTime = "12:00 AM";
    return tTime
  }

  firstLetterCapital(string: any) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  }


  filterArray(items: any[]): any[] {
    return Array.from(items.reduce((m, t) => m.set(t._id, t), new Map()).values());
  }

}
