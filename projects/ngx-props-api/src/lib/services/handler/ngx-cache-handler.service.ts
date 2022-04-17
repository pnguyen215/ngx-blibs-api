import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SysCache, SysStorages } from '../../model/enums/propsConstEnum';
import { allNotNull } from '../../utils/propsObjectUtils';
import { NgxCacheService } from '../ngx-cache.service';
import { NgxStoragesService } from '../ngx-storages.service';


@Injectable()
export class NgxCacheHandlerService implements NgxCacheService {

  private requestMaxAge = SysCache.CACHE_MAX_AGE_VALUE; // value default
  cache = new Map();

  constructor(
    private storagesService: NgxStoragesService
  ) { }


  setMaxAge(maxAge: number): void {
    this.requestMaxAge = allNotNull(maxAge) ? maxAge : this.requestMaxAge;
    this.storagesService.set(SysStorages.KEY_CACHE_REQ_MAX_AGE, this.requestMaxAge);
  }

  get(request: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = request.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - this.requestMaxAge);
    const expired = isExpired ? 'expired ' : '';
    console.log(`Http Request cache staging: url = ${url}, status = ${expired}`);

    return cached.response;
  }

  put(request: HttpRequest<any>, response: HttpResponse<any>): void {
    let expired = 0;
    const url = request.url;
    const entries = { url, response, lastRead: Date.now() };

    this.cache.set(url, entries);

    const maxAgeCached = this.storagesService.get(SysStorages.KEY_CACHE_REQ_MAX_AGE);

    if (allNotNull(maxAgeCached)) {
      expired = Date.now() - maxAgeCached;
    } else {
      expired = Date.now() - this.requestMaxAge;
    }

    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }

}
