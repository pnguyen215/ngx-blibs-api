import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesRequest } from '../../public-api';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export abstract class BlibsHttpBaseService {
  // set-up environments to api endpoint
  // tslint:disable-next-line: variable-name
  abstract setUpEnvironment(env: string): void;

  abstract logWritter(data: any): void;

  abstract get(relativeUrl: string): Observable<any>;

  abstract getWithParams(relativeUrl: string, params: HttpParams): Observable<any>;

  abstract post(relativeUrl: string, data: any): Observable<any>;

  abstract put(relativeUrl: string, data: any): Observable<any>;

  abstract deleteById(relativeUrl: string, id: number): Observable<any>;

  abstract deleteAll(relativeUrl: string): Observable<any>;

  abstract createHttps(method: string, relativeUrl: string, data: any): Observable<any>;

  abstract createOtherHttps(method: string, relativeUrl: string, data: any): Observable<any>;

  // download file includes: pdf, excel, json, images
  abstract getBuffersType(relativeUrl: string, params: HttpParams): Observable<any>;

  abstract getBuffersCsv(relativeUrl: string, params: HttpParams): Observable<any>;

  abstract uploadOtherParts(relativeUrl: string, data: any): Observable<any>;

  abstract uploadParts(relativeUrl: string, httpMethod: string, files: File, filesRequest: FilesRequest): Observable<any>;

  abstract uploadPartsWithHeader(relativeUrl: string, httpMethod: string, files: File, filesRequest: FilesRequest): Observable<any>;
}
