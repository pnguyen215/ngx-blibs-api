import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropsRecordPrototypes } from '../model/base/props-record-prototypes.model';

@Injectable({
  providedIn: 'root'
})
export abstract class NgxErrorsService {

  abstract handleErrorEvent(e: ErrorEvent): PropsRecordPrototypes<any>;

  abstract handleHttpErrorEvent(e: HttpErrorResponse): PropsRecordPrototypes<any>;

  abstract handleErrorEventUnknown(e: any): PropsRecordPrototypes<any>;
}
