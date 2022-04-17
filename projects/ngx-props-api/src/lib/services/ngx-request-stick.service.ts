import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxRequestStickService {

  private logs = new BehaviorSubject([]);

  constructor() { }

  get logs$() {
    return this.logs.asObservable();
  }


  add(message: any) {
    this.logs.next(this.logs.getValue().concat([message]));
  }

  reset() {
    this.logs.next([]);
  }
}
