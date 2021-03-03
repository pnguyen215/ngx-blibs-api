import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlibsToastService {

  message = new BehaviorSubject('');
  visible = new BehaviorSubject(false);

  constructor() { }

  update(value: string) {
    this.message.next(`${value}`);
  }

  show() {
    this.visible.next(true);
  }

  hide() {
    this.visible.next(false);
  }

}
