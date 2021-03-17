import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlibsHttpBaseImplService } from './impls/blibs-http-base-impl.service';
import * as CONST from '../blibs_const/blibs-const';
import { UserBuzzEndpoint } from '../blibs-endpoint/user-buzz-endpoint.model';
import { map } from 'rxjs/operators';
import { AuthResponse } from '../blibs_union/auth-response.model';
import { UserResponse } from '../blibs_union/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class BlibsAuthZHTTPService extends BlibsHttpBaseImplService {
  protected APIEndpoint = isDevMode() ? CONST.Params.APIEndpoint_DEV : CONST.Params.APIEndpoint_PROD;
  protected APIAuthEndpoint = isDevMode() ? CONST.Params.APIAuthEndpoint_DEV : CONST.Params.APIAuthEndpoint_PROD;
  protected USER_BUZZ_ENDPOINT = UserBuzzEndpoint.ENDPOINT_USER_BUZZ_URL;
  protected USER_BUZZ_AUTH_ENDPOINT = UserBuzzEndpoint.ENDPOINT_USER_URL;


  login(email: string, password: string): Observable<any> {
    const notFoundError = new Error('Not Found');
    if (!email || !password) {
      return of(notFoundError);
    }
    const data = {
      username: email,
      password
    };
    return this.signIn(data).pipe(
      map((result: AuthResponse) => {
        if (!result) {
          return notFoundError;
        }
        const auth = new AuthResponse();
        return auth.setAuthResponse(result);
      })
    );
  }

  getUserByToken(): Observable<any> {
    return this.snapCurrentUser().pipe(
      map((result: UserResponse) => {
        if (!result) {
          return of(undefined);
        }
        const user = new UserResponse();
        return of(user.setUser(result));
      })
    );
  }

  private signIn(data: any): Observable<AuthResponse> {
    this.setUpEnvironment(this.APIEndpoint);
    return this.post(this.USER_BUZZ_ENDPOINT.concat(UserBuzzEndpoint.ENDPOINT_USER_BUZZ_SIGN_IN), data);
  }

  private signUp(data: any): Observable<any> {
    this.setUpEnvironment(this.APIAuthEndpoint);
    return this.post(this.USER_BUZZ_AUTH_ENDPOINT.concat(UserBuzzEndpoint.ENDPOINT_USER_SIGN_UP), data);
  }

  private snapCurrentUser(): Observable<UserResponse> {
    this.setUpEnvironment(this.APIEndpoint);
    return this.get(this.USER_BUZZ_ENDPOINT.concat(UserBuzzEndpoint.ENDPOINT_USER_BUZZ_CURRENT));
  }
}
