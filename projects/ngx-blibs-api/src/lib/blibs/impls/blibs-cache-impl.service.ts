import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlibsAuthenticationService } from '../blibs-authentication.service';
import { BlibsCacheService } from '../blibs-cache.service';
import { BlibsStorageService } from '../blibs-storage.service';
import * as CONST from '../../blibs_const/blibs-const';
@Injectable()
export class BlibsCacheImplService implements BlibsCacheService {

  protected maxAge = 30000;
  cache = new Map();
  expired: string;

  constructor(
    private blibsAuthenticationService: BlibsAuthenticationService,
    private blibsStorageService: BlibsStorageService
  ) { }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    if (this.blibsAuthenticationService.isBlibsRoleAvaliable(13) === true) {
      const isExpired = cached.lastRead < (Date.now() - this.maxAge);
      this.expired = isExpired ? 'expired ' : '';
      console.log(`log for cache ===> ${url}: ${this.expired}`);
    }

    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);
    const expired = Date.now() - this.maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
        const isRemoved: boolean =
          this.blibsStorageService.remove(CONST.Storage.TOKEN)
          && this.blibsStorageService.remove(CONST.Storage.USERNAME)
          && this.blibsStorageService.remove(CONST.Storage.APP)
          && this.blibsStorageService.remove(CONST.Storage.ROLES)
          && this.blibsStorageService.remove(CONST.Storage.USER_ID)
          && this.blibsStorageService.remove(CONST.Storage.PRIVILEGES)
          ;
      }
    });
  }

}
