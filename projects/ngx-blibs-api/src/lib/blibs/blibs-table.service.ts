import { HttpClient, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, finalize, retry, tap } from 'rxjs/operators';
import { BlibsBaseModel } from '../blibs_models/blibs-base.model';
import { BlibsGroupingState } from '../blibs_models/blibs-grouping.model';
import { BlibsPaginatorState } from '../blibs_models/blibs-paginator-state.model';
import { BlibsSortState } from '../blibs_models/blibs-sort.model';
import { BlibsTableResponseModel, IBlibsTableState } from '../blibs_models/blibs-table-response.model';
import { BlibsAuthenticationService } from './blibs-authentication.service';
import { Logger } from './blibs-logger.service';

const DEFAULT_STATE: IBlibsTableState = {
    filter: {},
    paginator: new BlibsPaginatorState(),
    sorting: new BlibsSortState(),
    searchTerm: '',
    grouping: new BlibsGroupingState(),
    entityId: undefined
};

export abstract class BlibsTableService<T> {

    // Private fields
    // tslint:disable-next-line: variable-name
    private _items$ = new BehaviorSubject<T[]>([]);
    // tslint:disable-next-line: variable-name
    private _isLoading$ = new BehaviorSubject<boolean>(false);
    // tslint:disable-next-line: variable-name
    private _isFirstLoading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _tableState$ = new BehaviorSubject<IBlibsTableState>(DEFAULT_STATE);
    // tslint:disable-next-line: variable-name
    private _errorMessage = new BehaviorSubject<string>('');
    // tslint:disable-next-line: variable-name
    private _subscriptions: Subscription[] = [];

    // Getters
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
    // State getters
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

    protected authenticationService: BlibsAuthenticationService;
    protected http: HttpClient;
    protected logger = new Logger('[Blibs_Table_log]');
    // API URL has to be overrided
    protected HostAPIEndpoint: string;
    protected relativeUrl = '';
    protected numberRetry = 1;
    protected params: HttpParams;

    constructor(
        http: HttpClient,
        authenticationService: BlibsAuthenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }


    protected get headers() {
        // return new HttpHeaders({ 'Content-Type': 'application/json' });
        /*
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${this.authenticationService.getBlibsToken()}`,
        });
        */
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
        });

        if (this.authenticationService.isAuthenticated()) {
            headers = headers.append('Authorization', `Bearer ${this.authenticationService.getBlibsToken()}`);
        }

        return headers;
    }

    // Firstly, run this function! To connect api endpoint!
    setHostApi(host: string): void {
        this.HostAPIEndpoint = host ? host : 'localhost:8080';
    }

    setRelativeUrlApi(relativeUrl: string): void {
        this.relativeUrl = relativeUrl ? relativeUrl : '';
    }

    setParams(params: HttpParams) {
        this.params = params;
    }

    /**
     * @param obj - model request
     * @apiNote - return object base on BlibsTableResponseModel<T>
     */
    create(obj: BlibsBaseModel): Observable<BlibsTableResponseModel<T>> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.post<BlibsTableResponseModel<T>>(url, JSON.stringify(obj), { headers: this.headers }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Create obj has error', err);
                // this.handleError(err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param obj - model request
     * @apiNote - return object BlibsTableResponseModel<T>
     */
    _create(obj: any): Observable<BlibsTableResponseModel<T>> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.post<BlibsTableResponseModel<T>>(url, JSON.stringify(obj), { headers: this.headers }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Create obj has error', err);
                // this.handleError(err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param obj - model request
     * @apiNote - return object any
     */
    __create(obj: any): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.post(url, JSON.stringify(obj), { headers: this.headers }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Create obj has error', err);
                // this.handleError(err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /*
        findWiths(tableState: IBlibsTableState): Observable<BlibsTableResponseModel<T>> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._errorMessage.next('');
        return this.http.post<BlibsTableResponseModel<T>>(url, tableState, { headers: this.headers }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Find-post obj has error', err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            })
        );
    }
    */

    findWithGet(tableState: IBlibsTableState): Observable<BlibsTableResponseModel<T>> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._isLoading$.next(true);
        this._errorMessage.next('');
        return this.http.get<BlibsTableResponseModel<T>>(url, { headers: this.headers }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Find-get obj has error', err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - params request
     * @param tableState - tableState request
     * @apiNote - return object BlibsTableResponseModel<T>
     */
    postWithParams(params: HttpParams, tableState: IBlibsTableState): Observable<BlibsTableResponseModel<T>> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._isLoading$.next(true);
        this._errorMessage.next('');
        return this.http.post<BlibsTableResponseModel<T>>(url, tableState, { headers: this.headers, params }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Post obj has error', err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - params request
     * @apiNote - return object BlibsTableResponseModel<T>
     */
    _postWithParams(params: HttpParams): Observable<BlibsTableResponseModel<T>> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._isLoading$.next(true);
        this._errorMessage.next('');
        return this.http.post<BlibsTableResponseModel<T>>(url, { headers: this.headers, params }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Post obj has error', err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - params request
     * @apiNote - return object any
     */
    __postWithParams(params: HttpParams): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._isLoading$.next(true);
        this._errorMessage.next('');
        return this.http.post(url, { headers: this.headers, params }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Post obj has error', err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - params request
     * @param tableState - tableState request
     * @apiNote - return object BlibsTableResponseModel<T>
     */
    ___postWithParams(params: HttpParams, obj: BlibsBaseModel, tableState: IBlibsTableState): Observable<BlibsTableResponseModel<T>> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._isLoading$.next(true);
        this._errorMessage.next('');
        return this.http.post<BlibsTableResponseModel<T>>(url, tableState, { headers: this.headers, params }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Post obj has error', err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - params request
     * @param tableState - tableState request
     * @apiNote - return object BlibsTableResponseModel<T>
     */
    getWithParams(params: HttpParams, tableState: IBlibsTableState): Observable<BlibsTableResponseModel<T>> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._isLoading$.next(true);
        this._errorMessage.next('');
        return this.http.get<BlibsTableResponseModel<T>>(url, { headers: this.headers, params }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Find-get obj has error', err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }


    /**
     * @param params - params request
     * @apiNote - return object BlibsTableResponseModel<T>
     */
    _getWithParams(params: HttpParams): Observable<BlibsTableResponseModel<T>> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this.setParams(params);
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._isLoading$.next(true);
        this._errorMessage.next('');
        return this.http.get<BlibsTableResponseModel<T>>(url, { headers: this.headers, params }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Find-get obj has error', err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }


    /**
     * @param id - params request
     * @param labelQuery - set label for query into params
     * @apiNote - return object BlibsTableResponseModel<T>
     */
    getWithId(id: any, labelQuery: string): Observable<BlibsTableResponseModel<T>> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        const params = new HttpParams().set(`${labelQuery}`, id);
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._isLoading$.next(true);
        this._errorMessage.next('');
        return this.http.get<BlibsTableResponseModel<T>>(url, { headers: this.headers, params }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Get obj has error', err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }


    /**
     * @param params - params request
     * @apiNote - return object any
     */
    __getWithParams(params: HttpParams): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this.setParams(params);
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._isLoading$.next(true);
        this._errorMessage.next('');
        return this.http.get(url, { headers: this.headers, params: this.params }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Get obj has error', err);
                return of({
                    items: [],
                    total: 0,
                    message: '',
                    publish: new Date(),
                    data: null,
                    gwt: new Date(),
                    header: null
                });
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    updateWithParams(params: HttpParams, obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        this._isLoading$.next(true);
        this._errorMessage.next('');
        return this.http.put(url, JSON.stringify(obj), { headers: this.headers, params }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Update obj has error', err);
                return of(obj);
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    updateItems(ids: number[], labelQuery: string, obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        const params = new HttpParams().set(`${labelQuery}`, ids.join(','));
        return this.updateWithParams(params, obj);
    }

    delete(id: any): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }

        if (!id) {
            return of({});
        }

        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl).concat('?id=') + `${id}`;
        return this.http.delete(url, { headers: this.headers }).pipe(
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Delete item has error', id, err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    deleteWithParams(params: HttpParams): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.delete(url, { headers: this.headers, params }).pipe(
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Delete item has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    deleteItems(ids: number[] = []): Observable<any> {
        const tasks$ = [];
        ids.forEach(id => {
            tasks$.push(this.delete(id));
        });
        return forkJoin(tasks$);
    }

    deleteItemsWithParams(ids: any[] = [], labelQuery: string): Observable<any> {
        const tasks$ = [];
        ids.forEach(id => {
            tasks$.push(this.deleteWithParams(new HttpParams().set(`${labelQuery}`, id)));
        });
        return forkJoin(tasks$);
    }

    /**
     * @params query - data type : any
     * @apiNote - get all params as form HttpParams
     */
    public getParams(query) {
        let params: HttpParams = new HttpParams();
        for (const key of Object.keys(query)) {
            if (query[key]) {
                if (query[key] instanceof Array) {
                    query[key].forEach((item) => {
                        params = params.append(`${key.toString()}[]`, item);
                    });
                } else {
                    params = params.append(key.toString(), query[key]);
                }
            }
        }
        return params;
    }

    // pathState - POST
    public _patchState(patch: Partial<IBlibsTableState>) {
        this.patchStateWithoutFetch(patch);
        this._fetchWithParams();
    }

    // pathState - GET
    public patchState(patch: Partial<IBlibsTableState>) {
        this.patchStateWithoutFetch(patch);
        this.fetchWithParams();
    }

    public patchStateWithoutFetch(patch: Partial<IBlibsTableState>) {
        const newState = Object.assign(this._tableState$.value, patch);
        this._tableState$.next(newState);
    }

    /**
     * @param method - name method require
     * @param obj - body request
     * @apiNote - create http request to server api
     */
    createHttps(method: string, obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.request(
            method, url, {
            body: JSON.stringify(obj),
            headers: this.headers,
            responseType: 'json',
            reportProgress: true
        })
            .pipe(retry(this.numberRetry),
                catchError(err => {
                    this._errorMessage.next(err);
                    this.logger.error('Create https has error', err);
                    return of({});
                }),
                finalize(() => this._isLoading$.next(false))
            );
    }

    /**
     * @param method - name method require
     * @param obj - body request
     * @apiNote - create http request to server api
     */
    ___createHttps(method: string): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.request(
            method, url, {
            headers: this.headers,
            reportProgress: true
        })
            .pipe(retry(this.numberRetry),
                catchError(err => {
                    this._errorMessage.next(err);
                    this.logger.error('Create https has error', err);
                    return of({});
                }),
                finalize(() => this._isLoading$.next(false))
            );
    }

    /**
     * @param method - name method require
     * @param obj - body request
     * @apiNote - create http request to server api
     */
    _createHttps(method: string, params: HttpParams, obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.request(
            method, url, {
            body: JSON.stringify(obj),
            headers: this.headers,
            params,
            responseType: 'json',
            reportProgress: true
        })
            .pipe(retry(this.numberRetry),
                catchError(err => {
                    this._errorMessage.next(err);
                    this.logger.error('Create https has error', err);
                    return of({});
                }),
                finalize(() => this._isLoading$.next(false))
            );
    }

    /**
     * @param method - name method require
     * @param obj - body request
     * @apiNote - create http request to server api
     */
    __createHttps(method: string, params: HttpParams): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.request(
            method, url, {
            headers: this.headers,
            params,
            responseType: 'json',
            reportProgress: true
        })
            .pipe(retry(this.numberRetry),
                catchError(err => {
                    this._errorMessage.next(err);
                    this.logger.error('Create https has error', err);
                    return of({});
                }),
                finalize(() => this._isLoading$.next(false))
            );
    }


    /**
     * @param method - name method require
     * @param files - stream file require
     * @param obj - body request
     * @apiNote - upload files
     */
    uploadParts(method: string, files: File, obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        const data: FormData = new FormData();
        data.append('files', files);
        data.append('filesRequest', JSON.stringify(obj));
        const requests = new HttpRequest(
            `${method}`,
            `${url}`,
            data, {
            headers: this.headers,
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(requests).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Upload item has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }


    /**
     * @param method - name method require
     * @param files - stream file require
     * @param obj - body request
     * @apiNote - upload files
     */
    _uploadParts(method: string, form: FormData): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        const requests = new HttpRequest(
            `${method}`,
            `${url}`,
            form, {
            headers: this.headers,
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(requests).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Upload item has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param method - name method require
     * @param files - stream file require
     * @param obj - body request
     * @apiNote - upload files
     */
    __uploadParts(method: string, params: HttpParams, form: FormData): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        const requests = new HttpRequest(
            `${method}`,
            `${url}`,
            form, {
            headers: this.headers,
            reportProgress: true,
            params,
            responseType: 'json'
        });
        return this.http.request(requests).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Upload item has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - body request
     * @apiNote - downloade GET blobs
     */
    donwnloadBlobWithParams(params: HttpParams): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.get(url, {
            headers: this.headers,
            responseType: 'blob',
            params
        }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Download item has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - body request
     * @apiNote - downloade file includes: pdf, excel, json, images
     */
    donwnloadWithParams(params: HttpParams): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.get(url, {
            headers: this.headers,
            responseType: 'arraybuffer' as 'json',
            params
        }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Download item has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - body request
     * @apiNote - download POST blobs
     */
    _donwnloadBlobWithParams(params: HttpParams, obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.post(url, JSON.stringify(obj), {
            headers: this.headers,
            responseType: 'blob',
            params
        }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Download item has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - body request
     * @apiNote - downloade file includes: pdf, excel, json, images
     */
    _donwnloadWithParams(params: HttpParams, obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.post(url, JSON.stringify(obj), {
            headers: this.headers,
            responseType: 'arraybuffer' as 'json',
            params
        }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Download item has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - body request
     * @apiNote - downloade POST blobs
     */
    __donwnloadBlobWithParams(obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.post(url, JSON.stringify(obj), {
            headers: this.headers,
            responseType: 'blob'
        }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Download item has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - body request
     * @apiNote - downloade file includes: pdf, excel, json, images
     */
    __donwnloadWithParams(obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.post(url, JSON.stringify(obj), {
            headers: this.headers,
            responseType: 'arraybuffer' as 'json'
        }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Download item has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - body request
     * @apiNote - downloade file includes: csv
     */
    donwnloadWithParamsCsv(params: HttpParams): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.get(url, {
            headers: this.headers.append('Accept', 'text/csv; charset=utf-8'),
            responseType: 'text',
            params
        }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Download item csv has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    /**
     * @param params - body request
     * @apiNote - downloade file includes: csv
     */
    _donwnloadWithParamsCsv(params: HttpParams, obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.post(url, JSON.stringify(obj), {
            headers: this.headers.append('Accept', 'text/csv; charset=utf-8'),
            responseType: 'text',
            params
        }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Download item csv has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }


    /**
     * @param params - body request
     * @apiNote - downloade file includes: csv
     */
    __donwnloadWithParamsCsv(obj: BlibsBaseModel): Observable<any> {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const url = this.HostAPIEndpoint.concat(this.relativeUrl);
        return this.http.post(url, JSON.stringify(obj), {
            headers: this.headers.append('Accept', 'text/csv; charset=utf-8'),
            responseType: 'text',
        }).pipe(
            retry(this.numberRetry),
            catchError(err => {
                this._errorMessage.next(err);
                this.logger.error('Download item csv has error', err);
                return of({});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }


    /**
     * @apiNote - get all params as form HttpParams with POST
     */
    public _fetchWithParams() {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const request = this.postWithParams(this.params, this._tableState$.value)
            .pipe(
                tap((resObjs: BlibsTableResponseModel<T>) => {
                    this._items$.next(resObjs.items);
                    this.patchStateWithoutFetch({
                        paginator: this._tableState$.value.paginator.recalculatePaginator(
                            resObjs.total
                        ),
                    });
                }),
                catchError((err) => {
                    this._errorMessage.next(err);
                    return of({
                        items: [],
                        total: 0,
                        message: '',
                        publish: new Date(),
                        data: null,
                        gwt: new Date(),
                        header: null
                    });
                }),
                finalize(() => {
                    this._isLoading$.next(false);
                    const itemIds = this._items$.value.map((el: T) => {
                        const item = (el as unknown) as BlibsBaseModel;
                        return item.id;
                    });
                    this.patchStateWithoutFetch({
                        grouping: this._tableState$.value.grouping.clearRows(itemIds),
                    });
                })
            )
            // tslint:disable-next-line: deprecation
            .subscribe();
        this._subscriptions.push(request);
    }

    /**
     * @apiNote - get all params as form HttpParams with GET
     */
    public fetchWithParams() {
        if (!this.HostAPIEndpoint) {
            this.logger.error('Can not connect to HOST');
            return;
        }
        this._isLoading$.next(true);
        this._errorMessage.next('');
        const request = this.getWithParams(this.params, this._tableState$.value)
            .pipe(
                tap((resObjs: BlibsTableResponseModel<T>) => {
                    this._items$.next(resObjs.items);
                    this.patchStateWithoutFetch({
                        paginator: this._tableState$.value.paginator.recalculatePaginator(
                            resObjs.total
                        ),
                    });
                }),
                catchError((err) => {
                    this._errorMessage.next(err);
                    return of({
                        items: [],
                        total: 0,
                        message: '',
                        publish: new Date(),
                        data: null,
                        gwt: new Date(),
                        header: null
                    });
                }),
                finalize(() => {
                    this._isLoading$.next(false);
                    const itemIds = this._items$.value.map((el: T) => {
                        const item = (el as unknown) as BlibsBaseModel;
                        return item.id;
                    });
                    this.patchStateWithoutFetch({
                        grouping: this._tableState$.value.grouping.clearRows(itemIds),
                    });
                })
            )
            // tslint:disable-next-line: deprecation
            .subscribe();
        this._subscriptions.push(request);
    }

    public setDefaults() {
        this.patchStateWithoutFetch({ filter: {} });
        this.patchStateWithoutFetch({ sorting: new BlibsSortState() });
        this.patchStateWithoutFetch({ grouping: new BlibsGroupingState() });
        this.patchStateWithoutFetch({ searchTerm: '' });
        this.patchStateWithoutFetch({
            paginator: new BlibsPaginatorState()
        });
        this._isFirstLoading$.next(true);
        this._isLoading$.next(true);
        this._tableState$.next(DEFAULT_STATE);
        this._errorMessage.next('');
    }

    protected handleError(error: any) {
        // tslint:disable-next-line: prefer-const
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `:( Error server code : ${error.status} => Message: ${error.message}`;
        }
        // this.logWritter(errorMessage);
        return throwError(errorMessage);
    }
}
