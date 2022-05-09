import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { PropsRecordPrototypes } from '../../../model/base/props-record-prototypes.model';
import { NgxErrorsService } from '../../../services/ngx-errors.service';
import { toJson } from '../../../utils/propsJsonUtils';
import { Logger } from '../../../utils/propsLoggerUtils';

@Injectable()
export class NgxRequestGlobalErrorsInterceptorService implements ErrorHandler {

  protected logger = new Logger(NgxRequestGlobalErrorsInterceptorService.name);
  private recordsEOFPrototypesDefault: PropsRecordPrototypes<any>;

  constructor(
    private errorsService: NgxErrorsService
  ) { }

  handleError(e: Error | HttpErrorResponse): void {

    if (e instanceof HttpErrorResponse) {
      this.recordsEOFPrototypesDefault = this.errorsService.handleHttpErrorEvent(e);
      this.logger.error('You got handleError($e) is HttpErrorResponse');
    } else {
      this.recordsEOFPrototypesDefault = this.errorsService.handleErrorEventUnknown(e);
      this.logger.error('You got handleError($e) is unknown response');
    }

    this.logger.error('handleError($e) is: ', toJson(this.recordsEOFPrototypesDefault));

  }
}
