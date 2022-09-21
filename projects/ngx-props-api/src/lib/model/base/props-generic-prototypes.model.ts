import { HttpParams } from '@angular/common/http';
import { GroupStatePrototypes } from './props-group-state-prototypes.model';
import { PaginatorStatePrototypes } from './props-paginator-state-prototypes.model';
import { SortStatePrototypes } from './props-sort-state-prototypes.model';

// tslint:disable-next-line: no-empty-interface
export interface PropsGenericPrototypes {
}

export interface IRecordsState {
    filter: {};
    paginator: PaginatorStatePrototypes;
    sorting: SortStatePrototypes;
    searchTerm: string;
    grouping: GroupStatePrototypes;
    entityId: number | undefined;
}

export const RecordsStateDefault: IRecordsState = {
    filter: {},
    paginator: new PaginatorStatePrototypes(),
    sorting: new SortStatePrototypes(),
    searchTerm: '',
    grouping: new GroupStatePrototypes(),
    entityId: undefined
}

export interface IRequestRecordsDefault {
    host?: string;
    params?: HttpParams;
    prefixApi?: string;
    description?: string;
}

export const RequestRecordsDefault: IRequestRecordsDefault = {
    host: 'http://localhost:8080',
    prefixApi: '/api/v1/hook',
    params: undefined,
};

export interface IPropsCreateAction {
    create(): void;
}

export interface IPropsEditAction {
    edit(id: number): void;
}

export interface IPropsDeleteAction {
    delete(id: number): void;
}

export interface IPropsDeleteSelectedAction {
    grouping: GroupStatePrototypes;
    ngOnInit(): void;
    deleteSelected(): void;
}

export interface IPropsFetchSelectedAction {
    grouping: GroupStatePrototypes;
    ngOnInit(): void;
    fetchSelected(): void;
    fetchAll(): void;
}

export interface IPropsUpdateStatusForSelectedAction {
    grouping: GroupStatePrototypes;
    ngOnInit(): void;
    updateStatusForSelected(): void;
}
