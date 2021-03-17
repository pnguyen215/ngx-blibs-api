import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserBuzzRoutes } from '../blibs-endpoint/user-buzz-routes.module';
import * as CONST from '../blibs_const/blibs-const';
import { AuthResponse } from '../blibs_union/auth-response.model';
import { UserResponse } from '../blibs_union/user-response.model';
import { BlibsStorageService } from './blibs-storage.service';
@Injectable({
  providedIn: 'root'
})
export class BlibsAuthenticationService {

  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  currentUser$: Observable<UserResponse>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserResponse>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private blibsStorageService: BlibsStorageService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserResponse>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();

  }

  get currentUserValue(): UserResponse {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserResponse) {
    this.currentUserSubject.next(user);
  }

  isAuthenticated(): boolean {
    const auth = this.getInfoAuth();
    if (!auth || !auth.accessToken) {
      return false;
    }
    return true;
  }

  getBlibsToken(): string {
    /* return this.blibsStorageService.get((CONST.Storage.TOKEN)); */
    const auth = this.getInfoAuth();
    return auth.accessToken;
  }

  getBlibsRoles(): any {
    return this.getInfoUser().rolesOrder;
  }

  isBlibsRoleAvaliable(value: any): boolean {
    const roles = this.getBlibsRoles();
    if (roles === null || roles === undefined) {
      return false;
    }
    return roles.includes(value);
  }

  private isBlibsLogoutGlobal(): boolean {

    const isRemoved: boolean =
      this.blibsStorageService.remove(CONST.Storage.TOKEN)
      && this.blibsStorageService.remove(CONST.Storage.EXPIRATION)
      && this.blibsStorageService.remove(CONST.Storage.USERNAME)
      && this.blibsStorageService.remove(CONST.Storage.APP)
      && this.blibsStorageService.remove(CONST.Storage.ROLES)
      && this.blibsStorageService.remove(CONST.Storage.USER_ID)
      && this.blibsStorageService.remove(CONST.Storage.USER_INFO)
      && this.blibsStorageService.remove(CONST.Storage.PRIVILEGES)
      ;

    if (isRemoved) {
      return true;
    } else {
      return false;
    }
  }

  getUserId(): any {
    return this.getInfoUser().id;
  }

  getUserPrivileges(): any {
    return this.getInfoUser().user_prv.privileges;
  }

  isTokenExpired(): boolean {
    const expiredIn = this.getInfoAuth().expiresIn;
    // tslint:disable-next-line: new-parens
    return (Math.floor((new Date).getTime() / 1000)) >= expiredIn;
  }

  isManualTokenExpired(value: number): boolean {
    // tslint:disable-next-line: new-parens
    return (Math.floor((new Date).getTime() / 1000)) >= value;
  }

  logout() {
    if (this.isBlibsLogoutGlobal()) {
      // do something...
    }
    this.router.navigate([`${UserBuzzRoutes.AUTH_SIGN_IN}`], {
      queryParams: {},
    });
  }

  saveInfoUser(user: UserResponse): boolean {
    if (user && user.username) {
      this.blibsStorageService.set(CONST.Storage.USER_INFO, user);
      return true;
    }
    return false;
  }

  getInfoUser(): UserResponse {
    try {
      const user = this.blibsStorageService.get(CONST.Storage.USER_INFO);
      return user;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
  saveInfoAuth(auth: AuthResponse): boolean {
    if (auth && auth.accessToken) {
      this.blibsStorageService.set(CONST.Storage.TOKEN, auth);
      return true;
    }
    return false;
  }

  private getInfoAuth(): AuthResponse {
    try {
      const authStorages = this.blibsStorageService.get(CONST.Storage.TOKEN);
      return authStorages;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

}
