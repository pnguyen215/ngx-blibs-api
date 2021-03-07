import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlibsAuthenticationService } from '../blibs/blibs-authentication.service';

@Injectable()
export class BlibsAuthGuard implements CanActivate, CanActivateChild {

  isAuthenticated: boolean;
  isExpired: boolean;

  constructor(
    private blibsAuthenticationService: BlibsAuthenticationService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.isAuthenticated = this.blibsAuthenticationService.isAuthenticated();
    this.isExpired = this.blibsAuthenticationService.isTokenExpired();
    if (this.isAuthenticated && !this.isExpired) {
      return true;
    }
    this.router.navigate(['/auth/sign_in'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

}
