import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropsSocketIoReq, SocketIoDefault } from '../model/req/props-socket-io-req.model';
import { toJson } from '../utils/propsJsonUtils';
import { Logger } from '../utils/propsLoggerUtils';
import { allNotNull } from '../utils/propsObjectUtils';
import { NgxAnonymousWebsocketIoBaseService } from './ngx-anonymous-websocket-io-base.service';


@Injectable({
  providedIn: 'root'
})
export class NgxAnonymousSocketIoServiceService<T> {

  protected logger = new Logger(NgxAnonymousSocketIoServiceService.name);
  protected socketIoDefault: PropsSocketIoReq = SocketIoDefault;

  public messages: Subject<T>;

  constructor(
    public websocketIoBaseService: NgxAnonymousWebsocketIoBaseService
  ) { }


  setEnabledConnected(enabled: boolean): void {
    this.socketIoDefault = { ...this.socketIoDefault, enabledConnected: enabled };
  }

  setWebsocketUrl(websocketUrl: string): void {
    this.socketIoDefault = { ...this.socketIoDefault, websocketUrl };
  }

  setEnabledLogger(enabledLogger: boolean): void {
    this.socketIoDefault = { ...this.socketIoDefault, enabledLogger };
  }

  onMessages(): Subject<T> {

    if (allNotNull(this.socketIoDefault.enabledLogger) && this.socketIoDefault.enabledLogger) {
      this.logger.info('onMessages(), socketIo properties = ', toJson(this.socketIoDefault));
    }

    if (!allNotNull(this.socketIoDefault.websocketUrl)) {
      this.logger.error('onMessages(), websocketUrl is required (call setWebsocketUrl($) to set property)');
      return null;
    }

    if (!allNotNull(this.socketIoDefault.enabledConnected) || !this.socketIoDefault.enabledConnected) {
      this.logger.error('onMessages(), enabledConnected is required or false state (call setEnabledConnected($) to set property)');
      return null;
    }

    this.messages = (this.websocketIoBaseService
      .connect(this.socketIoDefault.websocketUrl)
      .pipe(map((response: MessageEvent): T => {
        const data = JSON.parse(response.data);

        if (allNotNull(this.socketIoDefault.enabledLogger) && this.socketIoDefault.enabledLogger) {
          this.logger.info('onMessages(), messages received = ', toJson(data));
        }

        return data;
      })) as Subject<T>);

    return this.messages;
  }

  onSendMessage(data: any) {

    if (allNotNull(data)) {
      this.messages.next(data);
      if (allNotNull(this.socketIoDefault.enabledLogger) && this.socketIoDefault.enabledLogger) {
        this.logger.info('onSendMessage($data), message has been sent successfully', toJson(data));
      }
    }

  }

}
