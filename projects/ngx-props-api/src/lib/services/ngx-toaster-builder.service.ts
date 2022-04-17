import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxToasterBuilderService {

  message = new BehaviorSubject('');
  visible = new BehaviorSubject(false);

  constructor() { }

  update(message: string) {
    this.message.next(`${message}`);
  }

  show() {
    this.visible.next(true);
  }

  hide() {
    this.visible.next(false);
  }
}
