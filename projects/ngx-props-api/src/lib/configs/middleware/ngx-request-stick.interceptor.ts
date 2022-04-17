import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxRequestStickService } from '../../services/ngx-request-stick.service';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class NgxRequestStickInterceptor implements HttpInterceptor {

  constructor(
    private stickService: NgxRequestStickService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let status: string;

    // extend server response observable with logging
    return next.handle(request).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => (status = event instanceof HttpResponse ? 'success' : 'fail'),
        // Operation failed; error is an HttpErrorResponse
        error => (status = 'failed')
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const url = request.urlWithParams.replace(new RegExp('^//|^.*?:(//)?', 'gi'), '');
        this.stickService.add({ url, status, elapsed, fullUrl: request.urlWithParams });
      })
    );
  }
}
