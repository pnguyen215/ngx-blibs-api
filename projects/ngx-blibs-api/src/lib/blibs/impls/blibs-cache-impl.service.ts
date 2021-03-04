import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlibsAuthenticationService } from '../blibs-authentication.service';
import { BlibsCacheService } from '../blibs-cache.service';
import { BlibsStorageService } from '../blibs-storage.service';
import * as CONST from '../../blibs_const/blibs-const';
@Injectable()
export class BlibsCacheImplService implements BlibsCacheService {

  private maxAge = 30000; // value default
  cache = new Map();

  constructor(
    private blibsAuthenticationService: BlibsAuthenticationService,
    private blibsStorageService: BlibsStorageService
  ) { }


  setMaxAge(value: number): void {
    this.maxAge = value;
    this.blibsStorageService.set(CONST.Storage.MAX_AGE, this.maxAge);
  }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    if (this.blibsAuthenticationService.isBlibsRoleAvaliable(13) === true) {
      const isExpired = cached.lastRead < (Date.now() - this.maxAge);
      const expired = isExpired ? 'expired ' : '';
      console.log(`[DEBUG] log for cache ===> ${url}: ${expired}`);
    }

    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);
    // tslint:disable-next-line: no-unused-expression
    let expired = 0;
    if (this.blibsStorageService.get(CONST.Storage.MAX_AGE) != null && this.blibsStorageService.get(CONST.Storage.MAX_AGE) !== undefined) {
      expired = Date.now() - this.blibsStorageService.get(CONST.Storage.MAX_AGE);
    } else {
      expired = Date.now() - this.maxAge;
    }
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }

}
