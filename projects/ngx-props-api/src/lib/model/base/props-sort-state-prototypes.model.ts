export type PropsTypeSortDirection = 'asc' | 'desc' | '';

export interface IPropsSortStatePrototypes {
    column: string;
    direction: PropsTypeSortDirection;
}

export class SortStatePrototypes implements IPropsSortStatePrototypes {
    column = 'id';
    direction: PropsTypeSortDirection = 'asc';
}

export interface IPropsSortView {
    sorting: SortStatePrototypes;
    ngOnInit(): void;
    sort(column: string): void;
}
