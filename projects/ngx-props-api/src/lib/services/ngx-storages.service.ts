import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { toJsonDefault } from '../utils/propsJsonUtils';
import { allNotNull } from '../utils/propsObjectUtils';
import { trimSingleQuotes } from '../utils/propsStringUtils';


@Injectable({
  providedIn: 'root'
})
export class NgxStoragesService {

  localStorage: Storage;

  subject = new Subject();

  constructor() {
    this.localStorage = window.localStorage;
  }

  get isStorageSupported(): boolean {
    return !!this.localStorage;
  }

  get(key: string): any {

    if (!allNotNull(key)) {
      return null;
    }

    if (this.isStorageSupported) {
      return JSON.parse(this.localStorage.getItem(trimSingleQuotes(key)));
    }

    return null;
  }

  set(key: string, value: any): boolean {

    if (!allNotNull(key) || !allNotNull(value)) {
      return false;
    }

    if (this.isStorageSupported) {
      this.localStorage.setItem(trimSingleQuotes(key), toJsonDefault(value));

      this.subject.next({
        type: 'set',
        key,
        value
      });

      return true;
    }

    return false;
  }

  remove(key: string): boolean {

    if (!allNotNull(key)) {
      return false;
    }

    if (this.isStorageSupported) {
      this.localStorage.removeItem(trimSingleQuotes(key));

      this.subject.next({
        type: 'remove',
        key
      });

      return true;
    }

    return false;
  }

}
