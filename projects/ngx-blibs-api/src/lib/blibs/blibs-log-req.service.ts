import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlibsLogReqService {

  private logs = new BehaviorSubject([]);

  constructor() { }

  get logs$() {
    return this.logs.asObservable();
  }


  add(msg: any) {
    this.logs.next(this.logs.getValue().concat([msg]));
  }

  reset() {
    this.logs.next([]);
  }
}
