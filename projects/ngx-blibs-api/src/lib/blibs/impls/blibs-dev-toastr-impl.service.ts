import { Injectable } from '@angular/core';
import { BlibsAlertService } from '../blibs-alert.service';
import { BlibsDevToastrService } from '../blibs-dev-toastr.service';

@Injectable()
export class BlibsDevToastrImplService implements BlibsDevToastrService {
  timeOutDefault = 50000;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    private alertService: BlibsAlertService
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
}
