export interface IBlibsGroupingState {
    selectedRowIds: Set<number>;
    itemIds: number[];
    checkAreAllRowsSelected(): boolean;
    selectRow(id: number): IBlibsGroupingState;
    // tslint:disable-next-line:variable-name
    clearRows(_itemIds: number[]): IBlibsGroupingState;
    isRowSelected(id: number): boolean;
    selectAllRows(): IBlibsGroupingState;
    getSelectedRows(): number[];
    getSelectedRowsCount(): number;
}

export class BlibsGroupingState implements IBlibsGroupingState {
    selectedRowIds: Set<number> = new Set<number>();
    itemIds = [];

    checkAreAllRowsSelected(): boolean {
        if (this.itemIds.length === 0) {
            return false;
        }

        return this.selectedRowIds.size === this.itemIds.length;
    }

    selectRow(id: number): BlibsGroupingState {
        if (this.selectedRowIds.has(id)) {
            this.selectedRowIds.delete(id);
        } else {
            this.selectedRowIds.add(id);
        }
        return this;
    }

    // tslint:disable-next-line:variable-name
    clearRows(_itemIds: number[]): BlibsGroupingState {
        this.itemIds = _itemIds;
        this.selectedRowIds = new Set<number>();
        return this;
    }

    isRowSelected(id: number): boolean {
        return this.selectedRowIds.has(id);
    }

    selectAllRows(): BlibsGroupingState {
        const areAllSelected = this.itemIds.length === this.selectedRowIds.size;
        if (areAllSelected) {
            this.selectedRowIds = new Set<number>();
        } else {
            this.selectedRowIds = new Set<number>();
            this.itemIds.forEach(id => this.selectedRowIds.add(id));
        }
        return this;
    }

    getSelectedRows(): number[] {
        return Array.from(this.selectedRowIds);
    }

    getSelectedRowsCount(): number {
        return this.selectedRowIds.size;
    }
}

export interface IBlibsGroupingView {
    grouping: BlibsGroupingState;
    ngOnInit(): void;
}
