import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthenticationService {

  abstract isAuthenticated(): boolean;

  abstract getBlibsToken(): any;

  abstract getBlibsRoles(): any;

  abstract isBlibsRoleAvaliable(value: any): boolean;

  abstract isBlibsLogoutGlobal(): boolean;

  abstract getUserId(): any;

  abstract getUserPrivileges(): any;
}
