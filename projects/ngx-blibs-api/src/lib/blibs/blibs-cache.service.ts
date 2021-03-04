import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BlibsCacheService {

  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;

  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;

  abstract setMaxAge(value: number): void; // set expiredEntry
}
