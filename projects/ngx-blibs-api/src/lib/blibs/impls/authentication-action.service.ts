import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { BlibsStorageService } from '../blibs-storage.service';
import * as CONST from '../../blibs_const/blibs-const';
@Injectable()
export class AuthenticationActionService implements AuthenticationService {

  constructor(
    private blibsStorageService: BlibsStorageService
  ) { }


  isAuthenticated(): boolean {
    if (this.getBlibsToken() !== null) {
      return true;
    }
    return false;
  }

  getBlibsToken(): any {
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
}
