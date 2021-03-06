import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlibsAuthenticationService } from '../blibs/blibs-authentication.service';
import * as CONST from '../blibs_const/blibs-const';
@Injectable({
  providedIn: 'root'
})
export class BlibsAuthorizationGuard implements CanActivate, CanActivateChild {

  constructor(
    private blibsAuthService: BlibsAuthenticationService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.blibsAuthService.isAuthenticated();
    const isExpired = this.blibsAuthService.isTokenExpired();
    if (!isAuthenticated || !isExpired) {
      if (isDevMode()) {
        this.router.navigateByUrl(`${CONST.Params.URL_DEV}`);
      } else {
        this.router.navigateByUrl(`${CONST.Params.URL_PROD}`);
      }
    }
    return isAuthenticated;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
