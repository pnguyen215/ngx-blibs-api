export const PropsPageSizes = [10, 25, 50, 100];


export interface IPropsPaginatorStatePrototypes {
    page: number;
    pageSize: number;
    total: number;
    recalculatePaginator(total: number): IPropsPaginatorStatePrototypes;
}


export class PaginatorStatePrototypes implements IPropsPaginatorStatePrototypes {
    page = 1;
    pageSize = PropsPageSizes[0];
    total = 0;
    pageSizes: number[] = [];

    recalculatePaginator(total: number): PaginatorStatePrototypes {
        this.total = total;
        return this;
    }
}

export interface IPropsPaginatorView {
    paginator: PaginatorStatePrototypes;
    ngOnInit(): void;
    paginate(paginator: PaginatorStatePrototypes): void;
}