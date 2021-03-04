import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlibsHttpBaseImplService } from '../impls/blibs-http-base-impl.service';
import { BlibsCacheInterceptor } from './blibs-cache-interceptor.service';
import { BlibsLogsReqInterceptor } from './blibs-logs-req-interceptor.service';
import { BlibsRetryInteceptor } from './blibs-retry-inteceptor.service';

export const httpInterceptorProviders = [

    { provide: HTTP_INTERCEPTORS, useClass: BlibsHttpBaseImplService, multi: true }, // from authentication request
    { provide: HTTP_INTERCEPTORS, useClass: BlibsCacheInterceptor, multi: true }, // from cache request
    // { provide: HTTP_INTERCEPTORS, useClass: BlibsRetryInteceptor, multi: true }, // from retry request
    { provide: HTTP_INTERCEPTORS, useClass: BlibsLogsReqInterceptor, multi: true }, // fomr logging request
];
