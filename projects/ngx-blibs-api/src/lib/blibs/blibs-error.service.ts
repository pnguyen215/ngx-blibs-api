import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlibsErrorService {

  cachedRequests: Array<HttpRequest<any>> = [];

  public collectFailedRequest(request: HttpRequest<any>): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
