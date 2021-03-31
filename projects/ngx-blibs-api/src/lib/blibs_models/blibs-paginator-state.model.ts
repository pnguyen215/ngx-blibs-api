export const BlibsPageSizes = [3, 5, 10, 15, 50, 100];

export interface IBlibsPaginatorState {
    page: number;
    pageSize: number;
    total: number;
    recalculatePaginator(total: number): IBlibsPaginatorState;
}

export class BlibsPaginatorState implements IBlibsPaginatorState {
    page = 1;
    pageSize = BlibsPageSizes[1];
    total = 0;
    pageSizes: number[] = [];

    recalculatePaginator(total: number): BlibsPaginatorState {
        this.total = total;
        return this;
    }
}

export interface IBlibsPaginatorView {
    paginator: BlibsPaginatorState;
    ngOnInit(): void;
    paginate(paginator: BlibsPaginatorState): void;
}
