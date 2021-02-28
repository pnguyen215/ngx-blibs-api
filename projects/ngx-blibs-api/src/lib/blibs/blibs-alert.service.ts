import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlertResponse, AlertType } from '../../public-api';

@Injectable({
  providedIn: 'root'
})
export class BlibsAlertService {

  private subject = new Subject<AlertResponse>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<AlertResponse> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, title: string, options?: any) {
    this.alert(new AlertResponse({ ...options, type: AlertType.Success, message, title }));
  }

  error(message: string, title: string, options?: any) {
    this.alert(new AlertResponse({ ...options, type: AlertType.Error, message, title }));
  }

  info(message: string, title: string, options?: any) {
    this.alert(new AlertResponse({ ...options, type: AlertType.Info, message, title }));
  }

  warn(message: string, title: string, options?: any) {
    this.alert(new AlertResponse({ ...options, type: AlertType.Warning, message, title }));
  }

  // main alert method
  alert(alert: AlertResponse) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new AlertResponse({ id }));
  }
}
