import { Injectable } from '@angular/core';
import { BlibsDateNormalizeReqModel } from '../blibs_models/blibs-request.model';
import { Logger } from './blibs-logger.service';

@Injectable({
  providedIn: 'root'
})
export class BlibsBaseUtilsService {

  readonly DELIMITER = '/';
  readonly DELIMITER_REQUEST = '-';
  /**
   * @param val Check for null Object
   */
  isObject(val) {
    if (val === null) {
      return false;
    }
    return ((typeof val === 'function') || (typeof val === 'object'));
  }

  /**
   * Parse JSON string
   */
  parseJSON(data) {
    data = data || '';
    return JSON.parse(data);
  }

  /**
   * Check empty object
   */
  checkEmptyObject(obj) {
    if (obj === undefined || obj === '' || obj === null) {
      return false;
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if the string is empty or null
   */
  checkNotNullAndNotEmpty(data) {
    if (data !== null && data !== '' && data !== undefined) {
      return true;
    }
    return false;
  }

  /**
   * Check if the variable is undefined
   */
  isUndefined(data) {
    if (data === 'undefined' || data === undefined) {
      return true;
    }
    return false;
  }

  /**
   * Searches for a given substring
   */
  contains(str: string, substring: string, fromIndex: number) {
    return str.indexOf(substring, fromIndex) !== -1;
  }

  /**
   * "Safer" String.toLowerCase()
   */
  lowerCase(str) {
    return str.toLowerCase();
  }

  /**
   * "Safer" String.toUpperCase()
   */
  upperCase(str) {
    return str.toUpperCase();
  }

  /**
   * UPPERCASE first char of each word.
   */
  properCase(str) {
    return this.lowerCase(str).replace(/^\w|\s\w/g, this.upperCase);
  }

  /**
   * UPPERCASE first char of each sentence and lowercase other chars.
   */
  sentenceCase(str) {
    // Replace first char of each sentence (new line or after '.\s+') to
    return this.lowerCase(str).replace(/(^\w)|\.\s+(\w)/gm, this.upperCase);
  }

  /***
    * @param dateRequest - dateRequest in form : dd/MM/yyyy
    * @apiNote - return string in form: yyyy-mm-dd
    */
  onChangeDateNormalizeManual(dateRequest: any, delimeter: string, delimeterRequest: string): string | null {
    if (!dateRequest) {
      return '';
    }
    const times = dateRequest.split(delimeter);
    const forms = {
      day: parseInt(times[0], 10),
      month: parseInt(times[1], 10),
      year: parseInt(times[2], 10),
    };
    return forms.year + delimeterRequest + forms.month + delimeterRequest + forms.day;
  }

  /***
    * @param dateRequest - dateRequest in form : dd {delimeter} MM {delimeter} yyyy
    * @apiNote - return string in form: yyyy {delimeterRequest} mm {delimeterRequest} dd
    * @description - [1, 2, 3] - [day, month, year]
    */
  _onChangeDateNormalizeManual(
    obj: BlibsDateNormalizeReqModel): string | null {
    const log = new Logger('Date Normalize');

    if (!obj.dateReq || !obj.prototypeDateChange || !obj.prototypeDateChange || !obj.delimeterReq || !obj.delimeterChange) {
      log.error('Body request null --> ', JSON.stringify(obj));
      return null;
    }

    if ((typeof obj.prototypeDateReq[0] !== 'number') || (typeof obj.prototypeDateChange[0] !== 'number')) {
      log.error('Prototype model is not number type! --> ', typeof (obj.prototypeDateReq), typeof (obj.prototypeDateChange));
      return null;
    }

    log.debug('Body request details --> ', JSON.stringify(obj));

    const map = new Map();
    map.set(1, 'day');
    map.set(2, 'month');
    map.set(3, 'year');

    const times = obj.dateReq.split(obj.delimeterReq);

    const temps = new Map();
    temps.set(map.get(obj.prototypeDateReq[0]), parseInt(times[0], 10));
    temps.set(map.get(obj.prototypeDateReq[1]), parseInt(times[1], 10));
    temps.set(map.get(obj.prototypeDateReq[2]), parseInt(times[2], 10));

    const part1 = parseInt(temps.get(map.get(obj.prototypeDateChange[0])), 10);
    const part2 = parseInt(temps.get(map.get(obj.prototypeDateChange[1])), 10);
    const part3 = parseInt(temps.get(map.get(obj.prototypeDateChange[2])), 10);

    return part1
      + obj.delimeterChange +
      part2 +
      obj.delimeterChange +
      part3;
  }

  /***
    * @param dateRequest - dateRequest in form : dd/MM/yyyy
    * @apiNote - return string in form: yyyy-mm-dd
    */
  onChangeDateAsiaNormalizeToISO(dateRequest): string | null {
    if (!dateRequest) {
      return '';
    }
    const times = dateRequest.split(this.DELIMITER);
    const forms = {
      day: parseInt(times[0], 10),
      month: parseInt(times[1], 10),
      year: parseInt(times[2], 10),
    };
    return forms.year + this.DELIMITER_REQUEST + forms.month + this.DELIMITER_REQUEST + forms.day;
  }

  /***
    * @param date - date in ISO form : yyyy-MM-dd HH:mm:ss
    * @apiNote - return number mliseconds
    */
  onChangeDateToMilliseconds(date): number | null {
    if (!date) {
      return 0;
    }
    const dateInTime = new Date(date);
    return dateInTime.getTime();
  }
}
