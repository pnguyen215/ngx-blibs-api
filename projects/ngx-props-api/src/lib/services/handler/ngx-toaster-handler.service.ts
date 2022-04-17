import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxAlertService } from '../ngx-alert.service';

@Injectable()
export class NgxToasterHandlerService {

  timeOutDefault = 50000;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  public message = new BehaviorSubject('');
  public visible = new BehaviorSubject(false);

  constructor(
    private alertService: NgxAlertService
  ) { }


  showSuccess(message: string, title: string) {
    this.alertService.success(message, title, this.options);
  }

  showError(message: string, title: string) {
    this.alertService.error(message, title, this.options);
  }

  showInfo(message: string, title: string) {
    this.alertService.info(message, title, this.options);
  }

  showWarning(message: string, title: string) {
    this.alertService.warn(message, title, this.options);
  }

  update(message: string): void {
    this.message.next(`${message}`);
  }

  show(): void {
    this.visible.next(true);
  }

  hide(): void {
    this.visible.next(false);
  }

}
