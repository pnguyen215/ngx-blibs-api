import { Injectable } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Logger } from '../../utils/propsLoggerUtils';
import { NgxAnonymousWebsocketIoBaseService } from '../ngx-anonymous-websocket-io-base.service';
import { Observable, Observer } from 'rxjs';
import { allNotNull } from '../../utils/propsObjectUtils';

@Injectable()
export class NgxAnonymousWebsocketIoBaseHandlerService implements NgxAnonymousWebsocketIoBaseService {

  protected logger = new Logger(NgxAnonymousWebsocketIoBaseHandlerService.name);
  private subject: AnonymousSubject<MessageEvent>;

  constructor() { }

  connect(websocketUrl: string): AnonymousSubject<MessageEvent> {

    if (!allNotNull(websocketUrl)) {
      this.logger.error('connect(websocketUrl), websocketUrl is required');
      return this.subject;
    }

    if (!this.subject) {
      this.subject = this.createInstance(websocketUrl);
      this.logger.info('connect($), websocket connected successfully on : ', websocketUrl);
    }

    return this.subject;
  }


  private createInstance(url: string): AnonymousSubject<MessageEvent> {
    const socketUrl = new WebSocket(url);

    const observable = new Observable((obs: Observer<MessageEvent>) => {
      socketUrl.onmessage = obs.next.bind(obs);
      socketUrl.onerror = obs.error.bind(obs);
      socketUrl.onclose = obs.complete.bind(obs);
      return socketUrl.close.bind(socketUrl);
    });

    const observer = {
      error: null,
      complete: null,
      // tslint:disable-next-line: ban-types
      next: (data: Object) => {
        if (socketUrl.readyState === WebSocket.OPEN) {
          socketUrl.send(JSON.stringify(data));
        }
      }
    };

    return new AnonymousSubject<MessageEvent>(observer, observable);
  }

}
