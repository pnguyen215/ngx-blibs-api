import { Injectable } from '@angular/core';

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
