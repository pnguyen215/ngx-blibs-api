import { Injectable } from '@angular/core';
import { BlibsDateNormalizeReqModel } from '../blibs_models/blibs-request.model';
import { Logger } from './blibs-logger.service';
import { formatDate } from '@angular/common';


type Descripted<T> = {
  [K in keyof T]: {
    readonly id: T[K];
    readonly description: string;
  }
}[keyof T];

// tslint:disable-next-line: ban-types
type NonFunctional<T> = T extends Function ? never : T;

@Injectable({
  providedIn: 'root'
})
export class BlibsBaseUtilsService {

  readonly DELIMITER = '/';
  readonly DELIMITER_REQUEST = '-';
  readonly STRING_ONLY_NUMBER_REGULAR_EXPRESSION = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/;
  readonly STRING_ONLY_NUMBERS_NATIVE_REGULAR_EXPRESSION = /^\d+$/;
  readonly STRING_EMAIL_REGULAR_EXPRESSION = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  readonly STRING_PHONE_NUMBER_REGULAR_EXPRESSION = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  // tslint:disable-next-line: max-line-length
  readonly STRING_URL_REGULAR_EXPRESSION = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  getNumberRegularExpression(): any {
    return this.STRING_ONLY_NUMBER_REGULAR_EXPRESSION;
  }
  getNumberNativeRegularExpression(): any {
    return this.STRING_ONLY_NUMBERS_NATIVE_REGULAR_EXPRESSION;
  }
  getEmailRegularExpression(): any {
    return this.STRING_EMAIL_REGULAR_EXPRESSION;
  }
  getPhoneRegularExpression(): any {
    return this.STRING_PHONE_NUMBER_REGULAR_EXPRESSION;
  }
  getUrlRegularExpression(): any {
    return this.STRING_URL_REGULAR_EXPRESSION;
  }

  isEmptyObjectNewerBrowser(values: any): boolean {
    return Object.keys(values).length === 0 && values.constructor === Object;
  }

  isObjectEmptyOlderBrowser(values: any): boolean {
    return (
      Object.prototype.toString.call(values) === '[object Object]' &&
      JSON.stringify(values) === '{}'
    );
  }

  areNotNull(...values: any): boolean {
    if (values === null || values === undefined || values === 'undefined' || values === '') {
      return false;
    }

    for (const item of values) {
      if (item === null || item === undefined || values === 'undefined' || values === '') {
        return false;
      }
    }

    return true;
  }

  isArrayEmpty(arrays: any): boolean {
    if (!Array.isArray(arrays)) {
      return false;
    }

    return arrays.length === 0;
  }

  parseToJSON(data: any): any {
    data = this.areNotNull(data) ? data : '';
    return JSON.parse(data);
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
  lowerCase(value: string): string {
    return this.areNotNull(value) ? value.toLowerCase() : '';
  }

  /**
   * "Safer" String.toUpperCase()
   */
  upperCase(value: string): string {
    return this.areNotNull(value) ? value.toUpperCase() : '';
  }

  /**
   * UPPERCASE first char of each word.
   */
  properCase(value: string): string {
    return this.lowerCase(value).replace(/^\w|\s\w/g, this.upperCase);
  }

  /**
   * UPPERCASE first char of each sentence and lowercase other chars.
   */
  sentenceCase(value: string): string {
    // Replace first char of each sentence (new line or after '.\s+') to
    return this.lowerCase(value).replace(/(^\w)|\.\s+(\w)/gm, this.upperCase);
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
  onChangeDateToMilliseconds(date: Date): number | null {
    if (!this.areNotNull(date)) {
      return 0;
    }
    const dateInTime = new Date(date);
    return dateInTime.getTime();
  }

  /**
   * @param enumeration - enum object
   * @param separatorRegex - separator regex default is _
   * @returns - new object {id: any, description: string}
   */
  /*
  * Example:
    export enum GoalProgressMeasurements {
        Percentage = 1,
        Numeric_Target = 2,
        Completed_Tasks = 3,
        Average_Milestone_Progress = 4,
        Not_Measured = 5
    }

    console.log(enumToDescriptedArray(GoalProgressMeasurements))
    // Produces:
    [
        {id: 1, description: "Percentage"},
        {id: 2, description: "Numeric Target"},
        {id: 3, description: "Completed Tasks"},
        {id: 4, description: "Average Milestone Progress"},
        {id: 5, description: "Not Measured"}
    ]
  */
  enumToDescriptedArray<T>(enumeration: T, separatorRegex: RegExp = /_/g): Descripted<T>[] {
    return (Object.keys(enumeration) as Array<keyof T>)
      .filter(key => isNaN(Number(key)))
      .filter(key => typeof enumeration[key] === 'number' || typeof enumeration[key] === 'string')
      .map(key => ({
        id: enumeration[key],
        description: String(key).replace(separatorRegex, ' '),
      }));
  }

  /**
   * @param enumeration - enum object
   * @returns - new object {id: any}
   * Example:
   */
  /*
  1. String/ numberic enum
  enum Colors1 {
    WHITE = 0,
    BLACK = 1
  }
  console.log(Object.values(Colors1)); // ['WHITE', 'BLACK', 0, 1]
  console.log(enumToArray(Colors1));   // [0, 1]

  2. Heterogenous enum
  enum Colors4 {
    WHITE = "white",
    BLACK = 0
  }
  console.log(Object.values(Colors4)); // ["BLACK", "white", 0]
  console.log(enumToArray(Colors4));   // ["white", 0]
  */
  enumToArray<T>(enumeration: T): NonFunctional<T[keyof T]>[] {
    return Object.keys(enumeration)
      .filter(key => isNaN(Number(key)))
      .map(key => enumeration[key])
      .filter(val => typeof val === 'number' || typeof val === 'string');
  }

  trimSingleQuotes(values: string): string {
    if (!this.areNotNull(values)) {
      return '';
    }
    return values.replace(/  +/g, ' ');
  }

  trimSingleQuotesTabs(values: string): string {
    if (!this.areNotNull(values)) {
      return '';
    }
    return values.replace(/\s\s+/g, ' ');
  }

  isVerifyNumber(values: any): boolean {
    if (!this.areNotNull(values)) {
      return false;
    }
    return this.getNumberRegularExpression().test(values) ||
      this.getNumberNativeRegularExpression().test(values);
  }

  isVerifyEmail(values: string): boolean {
    if (!this.areNotNull(values)) {
      return false;
    }
    return this.getEmailRegularExpression().test(values);
  }

  isVerifyPhoneNumber(values: string): boolean {
    if (!this.areNotNull(values)) {
      return false;
    }
    return this.getPhoneRegularExpression().test(values);
  }

  isVerifyUrl(values: string): boolean {
    if (!this.areNotNull(values)) {
      return false;
    }
    return this.getUrlRegularExpression().test(values);
  }

  toJson(values: any): string {
    if (!this.areNotNull(values)) {
      return '';
    }
    return JSON.stringify(values, null, 2);
  }

  toJsonParams(values: any, identSpace: number): string {
    if (!this.areNotNull(values)) {
      return '';
    }
    identSpace = this.areNotNull(identSpace) ? identSpace : 2;
    return JSON.stringify(values, null, identSpace);
  }

  handleTimeDurations(date: string): any {
    let delta = Math.abs(new Date().getTime() - new Date(date).getTime()) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = delta % 60;

    if (days > 0) {
      return this.handleTimesDuration(new Date(date), new Date());
    }

    if (hours > 0) {
      return this.handleTimeForm(hours, 'hour');
    }

    if (minutes > 0) {
      return this.handleTimeForm(minutes, 'minute');
    }

    return this.handleTimeForm(Math.round(seconds), 'second');
  }

  private handleTimeForm(value: number, type: string): string {
    const suffix = ' ago';
    if (value === undefined || value === null) {
      return '';
    }

    if (value === 0) {
      return 'just now';
    }

    if (value === 1) {
      return value + ' '.concat(type) + suffix;
    }

    if (value > 1) {
      return value + ' '.concat(type) + 's' + suffix;
    }
  }

  handleTimesDuration(date1, date2): string {
    const suffix = ' ago';
    const date2UTC = new Date(Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate()));
    const date1UTC = new Date(Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate()));

    // tslint:disable-next-line: one-variable-per-declaration
    let yAppendix = '', mAppendix = '', dAppendix = '';

    let days = date2UTC.getDate() - date1UTC.getDate();
    if (days < 0) {

      date2UTC.setMonth(date2UTC.getMonth() - 1);
      days += this.handleDaysInMonth(date2UTC);
    }

    let months = date2UTC.getMonth() - date1UTC.getMonth();
    if (months < 0) {
      date2UTC.setFullYear(date2UTC.getFullYear() - 1);
      months += 12;
    }

    const years = date2UTC.getFullYear() - date1UTC.getFullYear();

    if (years > 1) { yAppendix = ' years'; } else { yAppendix = ' year'; }
    if (months > 1) { mAppendix = ' months'; } else { mAppendix = ' month'; }
    if (days > 1) { dAppendix = ' days'; } else { dAppendix = ' day'; }

    if (years) {
      return years + yAppendix + suffix;
    }

    if (months) {
      return months + mAppendix + suffix;
    }

    if (days) {
      return days + dAppendix + suffix;
    }

  }

  private handleDaysInMonth(date2UTC) {
    const monthStart = new Date(date2UTC.getFullYear(), date2UTC.getMonth(), 1);
    const monthEnd = new Date(date2UTC.getFullYear(), date2UTC.getMonth() + 1, 1);
    const monthLength = (monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24);
    return monthLength;
  }

  formatShapeTime(date: Date, format: string, locale?: string): string {

    if (!format || !this.areNotNull(format)) {
      format = 'yyyy-MM-dd HH:mm:ss';
    }
    return formatDate(date, format, locale);
  }

  formatManualShapeTime(date: Date, format: string): string {

    if (!format || !this.areNotNull(format)) {
      format = 'yyyy-MM-dd hh:ii:ss';
    }

    const sliceStart = (value: number): string => value.toString().padStart(2, '0');
    return format
      .replace(/yyyy/g, sliceStart(date.getFullYear()))
      .replace(/dd/g, sliceStart(date.getDate()))
      .replace(/mm/g, sliceStart(date.getMonth() + 1))
      .replace(/hh/g, sliceStart(date.getHours()))
      .replace(/ii/g, sliceStart(date.getMinutes()))
      .replace(/ss/g, sliceStart(date.getSeconds()));
  }

  isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }

}
