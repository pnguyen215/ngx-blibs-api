import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxRequestCacheInterceptor } from './ngx-request-cache.interceptor';
import { NgxRequestRetryInterceptor } from './ngx-request-retry.interceptor';
import { NgxRequestStickInterceptor } from './ngx-request-stick.interceptor';

export const NgxInterceptorProviders = [

    { provide: HTTP_INTERCEPTORS, useClass: NgxRequestCacheInterceptor, multi: true }, // from cache request
    { provide: HTTP_INTERCEPTORS, useClass: NgxRequestRetryInterceptor, multi: true }, // from retry request
    { provide: HTTP_INTERCEPTORS, useClass: NgxRequestStickInterceptor, multi: true }, // from logging request
];

