import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { PropsUserRes } from '../../model/res/props-user-res.model';
import { Logger } from '../../utils/propsLoggerUtils';
import { allNotNull } from '../../utils/propsObjectUtils';
import { NgxAuthorizationService } from '../ngx-authorization.service';
import { NgxStoragesService } from '../ngx-storages.service';

@Injectable()
export class NgxAuthorizationHandlerService implements NgxAuthorizationService {

  protected logger = new Logger(NgxAuthorizationHandlerService.name);

  currentUser$: Observable<PropsUserRes>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<PropsUserRes>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private storagesService: NgxStoragesService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<PropsUserRes>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  get currentUserValue(): PropsUserRes {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: PropsUserRes) {
    this.currentUserSubject.next(user);
  }

  setUserDetails(key: string, user: any): boolean {

    if (!allNotNull(key, user)) {
      return false;
    }

    this.storagesService.set(key, user);
    return true;
  }

  getUserDetails(key: string): PropsUserRes {

    if (!allNotNull(key)) {
      this.logger.warn('getUserDetails($)', 'key is required');
      return undefined;
    }

    try {

      return this.storagesService.get(key);

    } catch (e) {
      this.logger.error(e);
      return undefined;
    }
  }

  logout(redirectToUrl: string): void {

    if (!allNotNull(redirectToUrl)) {
      this.logger.warn('logout($)', 'redirectToUrl is required');
      return;
    }

    this.router.navigate([`${redirectToUrl}`], {
      queryParams: {},
    });
  }

  isAuthenticated(key: string): boolean {
    const user: PropsUserRes = this.getUserDetails(key);

    if (!allNotNull(user)) {
      return false;
    }

    if (!allNotNull(user.accessToken)) {
      return false;
    }

    return true;
  }

  isVerifyTokenExpired(key: string): boolean {
    const user: PropsUserRes = this.getUserDetails(key);

    if (!allNotNull(user)) {
      return true;
    }

    if (!allNotNull(user.accessToken)) {
      return true;
    }

    const currentTime = Math.floor((new Date()).getTime() / 1000);
    const expiredTime = (JSON.parse(atob(user.accessToken.split('.')[1]))).exp;

    this.logger.warn(
      'currentTime = ', currentTime,
      ', expiredTime = ', expiredTime,
      ', isVerifyTokenExpired($):on result = ', currentTime >= expiredTime);

    return currentTime >= expiredTime;
  }

  isVerifyTokenExpiredWith(token: string): boolean {

    if (!allNotNull(token)) {
      return true;
    }

    const currentTime = Math.floor((new Date()).getTime() / 1000);
    const expiredTime = (JSON.parse(atob(token.split('.')[1]))).exp;

    this.logger.warn(
      'currentTime = ', currentTime,
      ', expiredTime = ', expiredTime,
      ', isVerifyTokenExpiredWith($):on result = ', currentTime >= expiredTime);

    return currentTime >= expiredTime;
  }

}
