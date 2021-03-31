import { BlibsGroupingState } from './blibs-grouping.model';
import { BlibsHeaderModel } from './blibs-header.model';
import { BlibsPageModel } from './blibs-page.model';
import { BlibsPaginatorState } from './blibs-paginator-state.model';
import { BlibsSortState } from './blibs-sort.model';

export interface IBlibsTableState {
    filter: {};
    paginator: BlibsPaginatorState;
    sorting: BlibsSortState;
    searchTerm: string;
    grouping: BlibsGroupingState;
    entityId: number | undefined;
}

export interface BlibsTableResponseModel<T> {
    message?: string;
    publish?: Date;
    data?: BlibsPageModel<T> | T;
    items: T[];
    total: number;
    gwt?: Date;
    header?: BlibsHeaderModel;
}

export interface IBlibsCreateAction {
    create(): void;
}

export interface IBlibsEditAction {
    edit(id: number): void;
}

export interface IBlibsDeleteAction {
    delete(id: number): void;
}

export interface IBlibsDeleteSelectedAction {
    grouping: BlibsGroupingState;
    ngOnInit(): void;
    deleteSelected(): void;
}

export interface IBlibsFetchSelectedAction {
    grouping: BlibsGroupingState;
    ngOnInit(): void;
    fetchSelected(): void;
    fetchAll(): void;
}

export interface IBlibsUpdateStatusForSelectedAction {
    grouping: BlibsGroupingState;
    ngOnInit(): void;
    updateStatusForSelected(): void;
}