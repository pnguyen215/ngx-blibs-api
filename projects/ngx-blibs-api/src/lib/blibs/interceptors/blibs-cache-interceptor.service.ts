import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { BlibsCacheService } from '../blibs-cache.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/of';
import { tap } from 'rxjs/operators';

@Injectable()
export class BlibsCacheInterceptor implements HttpInterceptor {

  constructor(private cache: BlibsCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
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
