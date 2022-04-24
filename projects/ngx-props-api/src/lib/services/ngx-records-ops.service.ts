import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { catchError, finalize, retry, tap } from 'rxjs/operators';
import { Logger } from '../utils/propsLoggerUtils';
import { toJson } from '../utils/propsJsonUtils';
import { PropsPrototypes } from '../model/base/props-prototypes.model';
import {
  IRecordsState,
  IRequestRecordsDefault,
  RecordsStateDefault,
  RequestRecordsDefault
} from '../model/base/props-generic-prototypes.model';
import {
  PropsRecordPrototypes,
  RecordsEOFPrototypesDefault
} from '../model/base/props-record-prototypes.model';
import { PaginatorStatePrototypes } from '../model/base/props-paginator-state-prototypes.model';
import { SortStatePrototypes } from '../model/base/props-sort-state-prototypes.model';
import { GroupStatePrototypes } from '../model/base/props-group-state-prototypes.model';
import * as SysConst from './../model/enums/propsConstEnum';
import { SysHttpMethods } from './../model/enums/propsConstEnum';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';



export abstract class NgxRecordsOpsService<T> {

  protected logger = new Logger(NgxRecordsOpsService.name);
  protected requestRetryTimes = SysConst.SysRequestApi.REQUEST_RETRY_TIMES;
  protected requestRecordsConfig: IRequestRecordsDefault = RequestRecordsDefault;
  protected recordsEOFPrototypesDefault: PropsRecordPrototypes<any> = RecordsEOFPrototypesDefault;
  protected http: HttpClient;

  // tslint:disable-next-line: variable-name
  private _items$ = new BehaviorSubject<T[]>([]);

  // tslint:disable-next-line: variable-name
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  // tslint:disable-next-line: variable-name
  private _isFirstLoading$ = new BehaviorSubject<boolean>(true);

  // tslint:disable-next-line: variable-name
  private _tableState$ = new BehaviorSubject<IRecordsState>(RecordsStateDefault);

  // tslint:disable-next-line: variable-name
  private _errorMessage = new BehaviorSubject<string>('');

  // tslint:disable-next-line: variable-name
  private _subscriptions: Subscription[] = [];


  constructor(
    http: HttpClient
  ) {
    this.http = http;
  }

  get item$() {
    return this._items$.asObservable();
  }
  get items$() {
    return this._items$.asObservable();
  }
  get isLoading$() {
    return this._isLoading$.asObservable();
  }
  get isFirstLoading$() {
    return this._isFirstLoading$.asObservable();
  }
  get errorMessage$() {
    return this._errorMessage.asObservable();
  }
  get subscriptions() {
    return this._subscriptions;
  }

  get paginator() {
    return this._tableState$.value.paginator;
  }
  get filter() {
    return this._tableState$.value.filter;
  }
  get sorting() {
    return this._tableState$.value.sorting;
  }
  get searchTerm() {
    return this._tableState$.value.searchTerm;
  }
  get grouping() {
    return this._tableState$.value.grouping;
  }

  protected get headers() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return headers;
  }

  protected requestUrl(): string {
    return `${this.requestRecordsConfig.host}${this.requestRecordsConfig.prefixApi}`;
  }

  protected handleError(e: any) {

    if (e instanceof HttpErrorResponse) {

      if (e.error instanceof ErrorEvent) {

        this.recordsEOFPrototypesDefault = {
          ...this.recordsEOFPrototypesDefault,
          message: e.error.message ? e.error.message : e.message,
          debugMsg: e.error.message ? e.error.message : e.message,
          fromSide: SysConst.SysPropsMessage.FROM_CLIENT
        };

      } else {
        this.recordsEOFPrototypesDefault = {
          ...this.recordsEOFPrototypesDefault,
          message: e.message,
          code: e.status,
          debugMsg: e.error.debugMsg ? e.error.debugMsg : 'error unknown',
          fromSide: SysConst.SysPropsMessage.FROM_SERVER
        };
      }

    } else {
      this.recordsEOFPrototypesDefault = {
        ...this.recordsEOFPrototypesDefault,
        message: e.error.message ? e.error.message : e.message,
        debugMsg: e.error.message ? e.error.message : e.message,
        messageErrorEvent: e,
        fromSide: SysConst.SysPropsMessage.FROM_UNKNOWN
      };
    }

    this.logger.error('handleError($e)', 'Source of reason = ', this.recordsEOFPrototypesDefault.fromSide);
    this.logger.error(e);

  }

  setHost(host: string) {
    this.requestRecordsConfig = { ...this.requestRecordsConfig, host };
  }

  setPrefixApi(prefixApi: string) {
    this.requestRecordsConfig = { ...this.requestRecordsConfig, prefixApi };
  }

  setParams(params: HttpParams) {
    this.requestRecordsConfig = { ...this.requestRecordsConfig, params };
  }

  setRequestRetryTimes(numberRetry: number) {
    this.requestRetryTimes = numberRetry ?
      numberRetry : SysConst.SysRequestApi.REQUEST_RETRY_TIMES;
  }

  tailRequestRecordsConfig() {
    this.logger.warn('tailRequestRecordsConfig() = ', toJson(this.requestRecordsConfig));
  }

  tailRecordsEOF() {
    this.logger.warn('tailRecordsEOF() = ', toJson(this.recordsEOFPrototypesDefault));
  }

  tailRequestRetryTimes() {
    this.logger.warn('tailRequestRetryTimes() = ', toJson(this.requestRetryTimes));
  }


  onGet(): Observable<PropsRecordPrototypes<T>> {

    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.get<PropsRecordPrototypes<T>>(url,
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  onGetAny(): Observable<any> {

    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.get(url,
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  onPut(body: PropsPrototypes): Observable<PropsRecordPrototypes<T>> {

    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.put<PropsRecordPrototypes<T>>(url, JSON.stringify(body),
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  onPutAny(body: PropsPrototypes): Observable<any> {

    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.put<any>(url, JSON.stringify(body),
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  onPost(body: PropsPrototypes): Observable<PropsRecordPrototypes<T>> {

    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.post<PropsRecordPrototypes<T>>(url, JSON.stringify(body),
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }



  onPostAny(body: PropsPrototypes): Observable<any> {

    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.post<any>(url, JSON.stringify(body),
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  onPostAnyRequest(body: any): Observable<PropsRecordPrototypes<T>> {

    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.post<PropsRecordPrototypes<T>>(url, JSON.stringify(body),
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  onPostAnyResponse(body: any): Observable<any> {

    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.post<any>(url, JSON.stringify(body),
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  onDelete(): Observable<PropsRecordPrototypes<T>> {

    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.delete<PropsRecordPrototypes<T>>(url,
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  onDeleteAny(): Observable<any> {

    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.delete<any>(url,
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  onRequest(method: SysHttpMethods, body: PropsPrototypes): Observable<PropsRecordPrototypes<T>> {
    this.logger.info('onRequest(method) = ', SysHttpMethods[method]);
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.request<PropsRecordPrototypes<T>>(
      SysHttpMethods[method], url, {
      body: JSON.stringify(body),
      headers: this.headers,
      params: this.requestRecordsConfig.params,
      responseType: 'json',
      reportProgress: true
    }).pipe(retry(this.requestRetryTimes),
      catchError(e => {
        this._errorMessage.next(e);
        this.handleError(e);
        return of(this.recordsEOFPrototypesDefault);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }


  onRequestAny(method: SysHttpMethods, body: any): Observable<any> {
    this.logger.info('onRequestAny(method) = ', SysHttpMethods[method]);
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.request<any>(
      SysHttpMethods[method], url, {
      body: JSON.stringify(body),
      headers: this.headers,
      params: this.requestRecordsConfig.params,
      responseType: 'json',
      reportProgress: true
    }).pipe(retry(this.requestRetryTimes),
      catchError(e => {
        this._errorMessage.next(e);
        this.handleError(e);
        return of(this.recordsEOFPrototypesDefault);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }


  onUploadParts(method: SysHttpMethods, form: FormData): Observable<any> {
    this.logger.info('onUploadParts(method) = ', SysHttpMethods[method]);
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    const request = new HttpRequest(
      `${SysHttpMethods[method]}`,
      `${url}`,
      form, {
      headers: this.headers,
      reportProgress: true,
      params: this.requestRecordsConfig.params,
      responseType: 'json'
    });
    return this.http.request(request).pipe(
      retry(this.requestRetryTimes),
      catchError(e => {
        this._errorMessage.next(e);
        this.handleError(e);
        return of(this.recordsEOFPrototypesDefault);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }


  onDownloadGetBlob(): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.get(url, {
      headers: this.headers,
      responseType: 'blob',
      params: this.requestRecordsConfig.params
    }).pipe(
      retry(this.requestRetryTimes),
      catchError(e => {
        this._errorMessage.next(e);
        this.handleError(e);
        return of(this.recordsEOFPrototypesDefault);

      }),
      finalize(() => this._isLoading$.next(false))
    );
  }


  onDownloadPostBlob(body: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.post(url, JSON.stringify(body), {
      headers: this.headers,
      responseType: 'blob',
      params: this.requestRecordsConfig.params
    }).pipe(
      retry(this.requestRetryTimes),
      catchError(e => {
        this._errorMessage.next(e);
        this.handleError(e);
        return of(this.recordsEOFPrototypesDefault);

      }),
      finalize(() => this._isLoading$.next(false))
    );
  }


  onDownloadGetDocs(): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.get(url, {
      headers: this.headers,
      responseType: 'arraybuffer' as 'json',
      params: this.requestRecordsConfig.params
    }).pipe(
      retry(this.requestRetryTimes),
      catchError(e => {
        this._errorMessage.next(e);
        this.handleError(e);
        return of(this.recordsEOFPrototypesDefault);

      }),
      finalize(() => this._isLoading$.next(false))
    );
  }


  onDownloadPostDocs(body: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.post(url, JSON.stringify(body), {
      headers: this.headers,
      responseType: 'arraybuffer' as 'json',
      params: this.requestRecordsConfig.params
    }).pipe(
      retry(this.requestRetryTimes),
      catchError(e => {
        this._errorMessage.next(e);
        this.handleError(e);
        return of(this.recordsEOFPrototypesDefault);

      }),
      finalize(() => this._isLoading$.next(false))
    );
  }


  onDownloadGetPdf(): Observable<any> {
    return this.onDownloadGetDocs();
  }


  onDownloadPostPdf(body: any): Observable<any> {
    return this.onDownloadPostDocs(body);
  }


  onDownloadGetExcel(): Observable<any> {
    return this.onDownloadGetDocs();
  }


  onDownloadPostExcel(body: any): Observable<any> {
    return this.onDownloadPostDocs(body);
  }


  onDownloadGetJson(): Observable<any> {
    return this.onDownloadGetDocs();
  }


  onDownloadPostJson(body: any): Observable<any> {
    return this.onDownloadPostDocs(body);
  }


  onDownloadGetImages(): Observable<any> {
    return this.onDownloadGetDocs();
  }


  onDownloadPostImages(body: any): Observable<any> {
    return this.onDownloadPostDocs(body);
  }


  onDownloadGetCsv(): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.get(url, {
      headers: this.headers.append('Accept', 'text/csv; charset=utf-8'),
      responseType: 'text',
      params: this.requestRecordsConfig.params
    }).pipe(
      retry(this.requestRetryTimes),
      catchError(e => {
        this._errorMessage.next(e);
        this.handleError(e);
        return of(this.recordsEOFPrototypesDefault);

      }),
      finalize(() => this._isLoading$.next(false))
    );
  }


  onDownloadPostCsv(body: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.post(url, JSON.stringify(body), {
      headers: this.headers.append('Accept', 'text/csv; charset=utf-8'),
      responseType: 'text',
      params: this.requestRecordsConfig.params
    }).pipe(
      retry(this.requestRetryTimes),
      catchError(e => {
        this._errorMessage.next(e);
        this.handleError(e);
        return of(this.recordsEOFPrototypesDefault);

      }),
      finalize(() => this._isLoading$.next(false))
    );
  }


  public patchStateWithoutFetch(patch: Partial<IRecordsState>) {
    const newState = Object.assign(this._tableState$.value, patch);
    this._tableState$.next(newState);
  }


  onGetRecordsState(recordsState: IRecordsState): Observable<PropsRecordPrototypes<T>> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.get<PropsRecordPrototypes<T>>(url,
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  onPostRecordsState(recordsState: IRecordsState): Observable<PropsRecordPrototypes<T>> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const url = this.requestUrl();

    return this.http.post<PropsRecordPrototypes<T>>(url, recordsState,
      { headers: this.headers, params: this.requestRecordsConfig.params }).pipe(
        retry(this.requestRetryTimes),
        catchError(e => {
          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => this._isLoading$.next(false))
      );
  }


  public onFetchGet() {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const request = this.onGetRecordsState(this._tableState$.value)
      .pipe(
        tap((responseItems: PropsRecordPrototypes<T>) => {
          this._items$.next(responseItems.items);

          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              responseItems.total
            ),
          });

        }),
        catchError((e) => {

          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => {
          this._isLoading$.next(false);

          const itemIds = this._items$.value.map((el: T) => {
            const item = (el as unknown) as PropsPrototypes;
            return item.id;
          });

          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });

        })
      ).subscribe();
    this._subscriptions.push(request);
  }


  public onFetchPost() {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const request = this.onPostRecordsState(this._tableState$.value)
      .pipe(
        tap((responseItems: PropsRecordPrototypes<T>) => {
          this._items$.next(responseItems.items);

          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              responseItems.total
            ),
          });

        }),
        catchError((e) => {

          this._errorMessage.next(e);
          this.handleError(e);
          return of(this.recordsEOFPrototypesDefault);

        }),
        finalize(() => {
          this._isLoading$.next(false);

          const itemIds = this._items$.value.map((el: T) => {
            const item = (el as unknown) as PropsPrototypes;
            return item.id;
          });

          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });

        })
      ).subscribe();
    this._subscriptions.push(request);
  }


  public onPostPatchState(patch: Partial<IRecordsState>) {
    this.patchStateWithoutFetch(patch);
    this.onFetchPost();
  }


  public onGetPatchState(patch: Partial<IRecordsState>) {
    this.patchStateWithoutFetch(patch);
    this.onFetchGet();
  }

  public setAttributesDefaults() {
    this.patchStateWithoutFetch({
      filter: {}
    });
    this.patchStateWithoutFetch({
      searchTerm: ''
    });
    this.patchStateWithoutFetch({
      sorting: new SortStatePrototypes()
    });
    this.patchStateWithoutFetch({
      grouping: new GroupStatePrototypes()
    });
    this.patchStateWithoutFetch({
      paginator: new PaginatorStatePrototypes()
    });
    this._isFirstLoading$.next(true);
    this._isLoading$.next(true);
    this._tableState$.next(RecordsStateDefault);
    this._errorMessage.next('');
  }



}
