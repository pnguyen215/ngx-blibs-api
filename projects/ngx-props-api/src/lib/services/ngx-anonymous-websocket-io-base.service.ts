import { Injectable } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export abstract class NgxAnonymousWebsocketIoBaseService {

  abstract connect(websocketUrl: string): AnonymousSubject<MessageEvent>;

}
