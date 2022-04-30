import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class NgxWebsocketIoBaseService {

  abstract connect(websocketUrl: string): Rx.Subject<MessageEvent>;

}
