import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxCacheService } from '../../../services/ngx-cache.service';

@Injectable()
export class NgxRequestCacheInterceptorService implements HttpInterceptor {

  METHOD_NOT_CACHED = ['PUT', 'POST', 'DELETE'];

  constructor(
    private cache: NgxCacheService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    if (this.METHOD_NOT_CACHED.includes(request.method)) {
      return next.handle(request);
    }

    const cached = this.cache.get(request);
    return cached ? of(cached) : this.sendRequest(request, next, this.cache);
  }

  sendRequest(request: HttpRequest<any>, next: HttpHandler, cache: NgxCacheService): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(request, event);
        }
      })
    );
  }
}
