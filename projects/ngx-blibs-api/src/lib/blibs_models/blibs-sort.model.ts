export type BlibsSortDirection = 'asc' | 'desc' | '';

export interface IBlibsSortState {
    column: string;
    direction: BlibsSortDirection;
}

export class BlibsSortState implements IBlibsSortState {
    column = 'id'; // Id by default
    direction: BlibsSortDirection = 'asc'; // asc by default;
}

export interface IBlibsSortView {
    sorting: BlibsSortState;
    ngOnInit(): void;
    sort(column: string): void;
}