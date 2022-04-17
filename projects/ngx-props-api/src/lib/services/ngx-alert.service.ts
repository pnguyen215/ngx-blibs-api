import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PropsToasterResponse, AlertType } from '../model/res/propsToasterResponse';


@Injectable({
  providedIn: 'root'
})
export class NgxAlertService {

  private subject = new Subject<PropsToasterResponse>();
  private defaultId = 'default-alert';

  onAlert(id = this.defaultId): Observable<PropsToasterResponse> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string, title: string, options?: any) {
    this.alert(new PropsToasterResponse({ ...options, type: AlertType.Success, message, title }));
  }

  error(message: string, title: string, options?: any) {
    this.alert(new PropsToasterResponse({ ...options, type: AlertType.Error, message, title }));
  }

  info(message: string, title: string, options?: any) {
    this.alert(new PropsToasterResponse({ ...options, type: AlertType.Info, message, title }));
  }

  warn(message: string, title: string, options?: any) {
    this.alert(new PropsToasterResponse({ ...options, type: AlertType.Warning, message, title }));
  }

  alert(alert: PropsToasterResponse) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  clear(id = this.defaultId) {
    this.subject.next(new PropsToasterResponse({ id }));
  }
}
