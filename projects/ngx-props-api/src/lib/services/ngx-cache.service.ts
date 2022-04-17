import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class NgxCacheService {

  abstract get(request: HttpRequest<any>): HttpResponse<any> | undefined;

  abstract put(request: HttpRequest<any>, response: HttpResponse<any>): void;

  abstract setMaxAge(maxAge: number): void;
}
