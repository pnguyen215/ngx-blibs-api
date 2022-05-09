import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { NgxLoaderInterceptorService } from './ngx-loader-interceptor.service';
import { NgxRequestCacheInterceptorService } from './ngx-request-cache-interceptor.service';
import { NgxRequestErrorsInterceptorService } from './ngx-request-errors-interceptor.service';
import { NgxRequestGlobalErrorsInterceptorService } from './ngx-request-global-errors-interceptor.service';
import { NgxRequestRetryInterceptorService } from './ngx-request-retry-interceptor.service';
import { NgxRequestStickInterceptorService } from './ngx-request-stick-interceptor.service';


export const NgxServiceInterceptorProviders = [

    { provide: HTTP_INTERCEPTORS, useClass: NgxRequestCacheInterceptorService, multi: true }, // from cache request
    { provide: HTTP_INTERCEPTORS, useClass: NgxRequestRetryInterceptorService, multi: true }, // from retry request
    { provide: HTTP_INTERCEPTORS, useClass: NgxRequestStickInterceptorService, multi: true }, // from logging request
    { provide: HTTP_INTERCEPTORS, useClass: NgxRequestErrorsInterceptorService, multi: true }, // from error http request
    { provide: HTTP_INTERCEPTORS, useClass: NgxLoaderInterceptorService, multi: true }, // from loader http request
    { provide: ErrorHandler, useClass: NgxRequestGlobalErrorsInterceptorService }
];
