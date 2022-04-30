import { Injectable } from '@angular/core';
import { PropsUserRes } from '../model/res/props-user-res.model';

@Injectable({
  providedIn: 'root'
})
export abstract class NgxAuthorizationService {

  abstract get currentUserValue(): PropsUserRes;

  abstract set currentUserValue(user: PropsUserRes);

  abstract logout(redirectToUrl: string): void;

  abstract setUserDetails(key: string, user: any): boolean;

  abstract getUserDetails(key: string): PropsUserRes;

  abstract isAuthenticated(key: string): boolean;

  abstract isVerifyTokenExpired(key: string): boolean;

  abstract isVerifyTokenExpiredWith(token: string): boolean;
}
