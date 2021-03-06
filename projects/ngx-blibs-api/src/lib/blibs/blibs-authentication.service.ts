import { Injectable } from '@angular/core';
import * as CONST from '../blibs_const/blibs-const';
import { BlibsStorageService } from './blibs-storage.service';
@Injectable({
  providedIn: 'root'
})
export class BlibsAuthenticationService {
  constructor(
    private blibsStorageService: BlibsStorageService
  ) { }


  isAuthenticated(): boolean {
    if (this.getBlibsToken() === null ||
      this.getBlibsToken() === '') {
      return false;
    }
    return true;
  }

  getBlibsToken(): string {
    return this.blibsStorageService.get((CONST.Storage.TOKEN));
  }

  getBlibsRoles(): any {
    return this.blibsStorageService.get((CONST.Storage.ROLES));
  }

  isBlibsRoleAvaliable(value: any): boolean {
    const roles = this.getBlibsRoles();
    if (roles === null || roles === undefined) {
      return false;
    }
    return roles.includes(value);
  }

  isBlibsLogoutGlobal(): boolean {

    const isRemoved: boolean =
      this.blibsStorageService.remove(CONST.Storage.TOKEN)
      && this.blibsStorageService.remove(CONST.Storage.EXPIRATION)
      && this.blibsStorageService.remove(CONST.Storage.USERNAME)
      && this.blibsStorageService.remove(CONST.Storage.APP)
      && this.blibsStorageService.remove(CONST.Storage.ROLES)
      && this.blibsStorageService.remove(CONST.Storage.USER_ID)
      && this.blibsStorageService.remove(CONST.Storage.PRIVILEGES)
      ;

    if (isRemoved) {
      return true;
    } else {
      return false;
    }
  }

  getUserId(): any {
    return this.blibsStorageService.get(CONST.Storage.USER_ID);
  }

  getUserPrivileges(): any {
    return this.blibsStorageService.get(CONST.Storage.PRIVILEGES);
  }

  isTokenExpired(): boolean {
    const expiredIn = this.blibsStorageService.get(CONST.Storage.EXPIRATION);
    // tslint:disable-next-line: new-parens
    return (Math.floor((new Date).getTime() / 1000)) >= expiredIn;
  }

  isManualTokenExpired(value: number): boolean {
    const expiredIn = this.blibsStorageService.get(CONST.Storage.EXPIRATION);
    // tslint:disable-next-line: new-parens
    return (Math.floor((new Date).getTime() / 1000)) >= value;
  }
}
