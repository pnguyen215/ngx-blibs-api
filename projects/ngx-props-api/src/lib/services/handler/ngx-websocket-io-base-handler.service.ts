import { Injectable } from '@angular/core';
import { Logger } from '../../utils/propsLoggerUtils';
import { NgxWebsocketIoBaseService } from '../ngx-websocket-io-base.service';
import * as Rx from 'rxjs';
import { allNotNull } from '../../utils/propsObjectUtils';

@Injectable()
export class NgxWebsocketIoBaseHandlerService implements NgxWebsocketIoBaseService {

  protected logger = new Logger(NgxWebsocketIoBaseHandlerService.name);
  private subject: Rx.Subject<MessageEvent>;

  constructor() { }

  connect(websocketUrl: string): Rx.Subject<MessageEvent> {

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


  private createInstance(url: string): Rx.Subject<MessageEvent> {
    const socketUrl = new WebSocket(url);

    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        socketUrl.onmessage = obs.next.bind(obs);
        socketUrl.onerror = obs.error.bind(obs);
        socketUrl.onclose = obs.complete.bind(obs);
        return socketUrl.close.bind(socketUrl);
      });

    const observer = {
      // tslint:disable-next-line: ban-types
      next: (data: Object) => {
        if (socketUrl.readyState === WebSocket.OPEN) {
          socketUrl.send(JSON.stringify(data));
        }
      }
    };

    return Rx.Subject.create(observer, observable);
  }
}
