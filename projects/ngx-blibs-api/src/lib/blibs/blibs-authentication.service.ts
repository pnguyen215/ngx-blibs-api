import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserBuzzRoutes } from '../blibs-endpoint/user-buzz-routes.module';
import * as CONST from '../blibs_const/blibs-const';
import { AuthResponse } from '../blibs_union/auth-response.model';
import { UserResponse } from '../blibs_union/user-response.model';
import { BlibsAuthZHTTPService } from './blibs-auth-zhttp.service';
import { BlibsStorageService } from './blibs-storage.service';
@Injectable({
  providedIn: 'root'
})
export class BlibsAuthenticationService implements OnDestroy {

  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  currentUser$: Observable<UserResponse>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserResponse>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private blibsStorageService: BlibsStorageService,
    private blibsAuthHttpService: BlibsAuthZHTTPService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserResponse>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    // tslint:disable-next-line: deprecation
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  get currentUserValue(): UserResponse {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserResponse) {
    this.currentUserSubject.next(user);
  }

  login(email: string, password: string): Observable<UserResponse> {
    this.isLoadingSubject.next(true);
    return this.blibsAuthHttpService.login(email, password).pipe(
      map((auth: AuthResponse) => {
        const result = this.saveInfoAuth(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err [login]', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  isAuthenticated(): boolean {
    const auth = this.getInfoAuth();
    if (!auth || !auth.accessToken) {
      return false;
    }
    if (this.getBlibsToken() === null ||
      this.getBlibsToken() === '') {
      return false;
    }
    return true;
  }

  getBlibsToken(): string {
    /* return this.blibsStorageService.get((CONST.Storage.TOKEN)); */
    const auth = this.getInfoAuth();
    return auth.accessToken;
  }

  getBlibsRoles(): number[] {
    return this.blibsStorageService.get(CONST.Storage.USER_INFO).rolesOrder;
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
    return this.blibsStorageService.get(CONST.Storage.USER_INFO).id;
  }

  getUserPrivileges(): any {
    return this.blibsStorageService.get(CONST.Storage.USER_INFO).user_prv.privileges;
  }

  isTokenExpired(): boolean {
    const expiredIn = this.blibsStorageService.get(CONST.Storage.TOKEN).expiresIn;
    // tslint:disable-next-line: new-parens
    return (Math.floor((new Date).getTime() / 1000)) >= expiredIn;
  }

  isManualTokenExpired(value: number): boolean {
    const expiredIn = this.blibsStorageService.get(CONST.Storage.TOKEN).expiresIn;
    // tslint:disable-next-line: new-parens
    return (Math.floor((new Date).getTime() / 1000)) >= value;
  }

  logout() {
    if (this.isBlibsLogoutGlobal()) {
      console.log('[INFO IS DELETED]');
    }
    this.router.navigate([`${UserBuzzRoutes.AUTH_SIGN_IN}`], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserResponse> {
    const auth = this.getInfoAuth();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.blibsAuthHttpService.getUserByToken().pipe(
      map((user: UserResponse) => {
        if (user) {
          this.blibsStorageService.set(CONST.Storage.USER_INFO, user);
          this.currentUserSubject = new BehaviorSubject<UserResponse>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  private saveInfoAuth(auth: AuthResponse): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      this.blibsStorageService.set(CONST.Storage.TOKEN, auth);
      return true;
    }
    return false;
  }

  private getInfoAuth(): AuthResponse {
    try {
      /*
      const authData = JSON.parse(
        localStorage.getItem(CONST.Storage.TOKEN)
      );
      return authData;
      */
      const authStorages = this.blibsStorageService.get(CONST.Storage.TOKEN);
      return authStorages;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
