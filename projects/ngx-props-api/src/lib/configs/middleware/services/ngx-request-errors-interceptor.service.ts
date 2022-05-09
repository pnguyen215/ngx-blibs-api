import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  PropsRecordPrototypes
} from '../../../model/base/props-record-prototypes.model';
import { Logger } from '../../../utils/propsLoggerUtils';
import { map, catchError } from 'rxjs/operators';
import { NgxErrorsService } from '../../../services/ngx-errors.service';

@Injectable()
export class NgxRequestErrorsInterceptorService implements HttpInterceptor {

  protected logger = new Logger(NgxRequestErrorsInterceptorService.name);
  private recordsEOFPrototypesDefault: PropsRecordPrototypes<any>;

  constructor(
    private errorsService: NgxErrorsService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(map(response => {
      if (response instanceof HttpResponse) {
        return response;
      }
    }),
      catchError((error) => {

        let handleOthers = false;

        if (error instanceof HttpErrorResponse) {

          this.recordsEOFPrototypesDefault = this.errorsService.handleHttpErrorEvent(error);
          this.logger.warn('--> NgxRequestErrorsInterceptorService()', 'overcome HttpErrorResponse firewall [1]');

          return throwError(this.recordsEOFPrototypesDefault);

          /*
          if (error.error instanceof ErrorEvent) {

            this.logger.warn('--> NgxRequestErrorsInterceptorService()', 'overcome ErrorEvent firewall [2]');
            this.recordsEOFPrototypesDefault = this.errorsService.handleErrorEvent(error.error);
            return of(this.recordsEOFPrototypesDefault);

          } else {

            this.logger.warn('--> NgxRequestErrorsInterceptorService()', 'overcome Not ErrorEvent firewall [3]');
            this.recordsEOFPrototypesDefault = this.errorsService.handleErrorEventUnknown(error);
            handleOthers = true;

          }
          */

        } else {

          handleOthers = true;
          this.logger.warn('--> NgxRequestErrorsInterceptorService()', 'overcome Not HttpErrorResponse firewall [4]');
          this.recordsEOFPrototypesDefault = this.errorsService.handleErrorEventUnknown(error);

        }

        if (handleOthers) {

          this.logger.warn('--> NgxRequestErrorsInterceptorService()', 'overcome Not ErrorEvent firewall [5]');
          return throwError(this.recordsEOFPrototypesDefault);

        } else {

          this.logger.warn('--> NgxRequestErrorsInterceptorService()', 'overcome Unknown (HttpErrorResponse & ErrorEvent)  firewall [6]');
          return throwError(error);

        }

        // return of(error);
        // return throwError(error);
      })
    );




  }
}
