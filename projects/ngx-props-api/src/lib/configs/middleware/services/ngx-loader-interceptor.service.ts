import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxLoaderService } from '../../../services/ngx-loader.service';
import { Logger } from '../../../utils/propsLoggerUtils';

@Injectable()
export class NgxLoaderInterceptorService implements HttpInterceptor {

  protected logger = new Logger(NgxLoaderInterceptorService.name);
  private requests: HttpRequest<any>[] = [];

  constructor(
    private loaderService: NgxLoaderService
  ) { }

  removeRequest(request: HttpRequest<any>) {
    const i = this.requests.indexOf(request);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    this.logger.info('removeRequest(request) = ', i, this.requests.length);
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(request);
    this.loaderService.isLoading.next(true);

    return Observable.create(observer => {
      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
              observer.next(event);
            }
          },
          error => { this.removeRequest(request); observer.error(error); },
          () => { this.removeRequest(request); observer.complete(); });

      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }

}
