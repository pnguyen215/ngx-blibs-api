import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { SysRequestApi } from '../../../model/enums/propsConstEnum';
import { allNotNull } from '../../../utils/propsObjectUtils';

@Injectable()
export class NgxRequestRetryInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!allNotNull(SysRequestApi.REQUEST_ENABLED_RETRY_TIMES) ||
      SysRequestApi.REQUEST_ENABLED_RETRY_TIMES === false) {
      return next.handle(request);
    }

    return next.handle(request).pipe(retry(SysRequestApi.REQUEST_RETRY_TIMES));
  }
}
