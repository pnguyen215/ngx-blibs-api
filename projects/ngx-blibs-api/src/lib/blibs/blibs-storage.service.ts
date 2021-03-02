import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlibsStorageService {

  localStorage: Storage;

  subject = new Subject();

  constructor() {
    this.localStorage = window.localStorage;
  }

  get isBilbsLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

  get(key: string): any {

    if (key === '' || key === undefined) {
      return null;
    }

    if (this.isBilbsLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key));
    }
    return null;
  }

  set(key: string, value: any): boolean {

    if (key === '' || key === undefined || value === undefined) {
      return false;
    }

    if (this.isBilbsLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
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

    if (key === '' || key === undefined) {
      return false;
    }

    if (this.isBilbsLocalStorageSupported) {
      this.localStorage.removeItem(key);
      this.subject.next({
        type: 'remove',
        key
      });
      return true;
    }
    return false;
  }

}
