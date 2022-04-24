import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropsRecordPrototypes, RecordsEOFPrototypesDefault } from '../../model/base/props-record-prototypes.model';
import { SysPropsMessage } from '../../model/enums/propsConstEnum';
import { Logger } from '../../utils/propsLoggerUtils';
import { NgxErrorsService } from '../ngx-errors.service';


@Injectable()
export class NgxErrorsHandlerService implements NgxErrorsService {

  protected logger = new Logger(NgxErrorsHandlerService.name);
  private recordsEOFPrototypesDefault: PropsRecordPrototypes<any> = RecordsEOFPrototypesDefault;

  handleErrorEvent(e: ErrorEvent): PropsRecordPrototypes<any> {

    this.recordsEOFPrototypesDefault = {
      ...this.recordsEOFPrototypesDefault,
      message: e.error.message ? e.error.message : e.message,
      debugMsg: e.error.message ? e.error.message : e.message,
      fromSide: SysPropsMessage.FROM_CLIENT
    };

    this.logger.error('handleErrorEvent($e)',
      'Source of reason = ',
      this.recordsEOFPrototypesDefault.fromSide);

    return this.recordsEOFPrototypesDefault;
  }

  handleHttpErrorEvent(e: HttpErrorResponse): PropsRecordPrototypes<any> {

    this.recordsEOFPrototypesDefault = {
      ...this.recordsEOFPrototypesDefault,
      message: e.message,
      code: e.status,
      debugMsg: e.error.debugMsg ? e.error.debugMsg : 'error unknown',
      fromSide: SysPropsMessage.FROM_SERVER
    };

    this.logger.error('handleHttpErrorEvent($e)',
      'Source of reason = ',
      this.recordsEOFPrototypesDefault.fromSide);

    return this.recordsEOFPrototypesDefault;
  }


  handleErrorEventUnknown(e: any): PropsRecordPrototypes<any> {

    this.recordsEOFPrototypesDefault = {
      ...this.recordsEOFPrototypesDefault,
      message: e.error.message ? e.error.message : e.message,
      debugMsg: e.error.message ? e.error.message : e.message,
      messageErrorEvent: e,
      fromSide: SysPropsMessage.FROM_UNKNOWN
    };

    this.logger.error('handleErrorEventUnknown($e)',
      'Source of reason = ',
      this.recordsEOFPrototypesDefault.fromSide);

    return this.recordsEOFPrototypesDefault;
  }

}
