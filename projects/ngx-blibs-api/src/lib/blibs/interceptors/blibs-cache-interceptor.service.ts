import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { BlibsCacheService } from '../blibs-cache.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class BlibsCacheInterceptor implements HttpInterceptor {

  ARE_HTTP_NOT_CACHED = ['PUT', 'POST', 'DELETE'];

  constructor(private cache: BlibsCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.ARE_HTTP_NOT_CACHED.includes(req.method)) {
      return next.handle(req);
    }
    const cached = this.cache.get(req);
    return cached ? of(cached) : this.sendRequest(req, next, this.cache);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: BlibsCacheService): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(req, event);
        }
      })
    );
  }
}
