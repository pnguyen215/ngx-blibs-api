export interface IPropsGroupStatePrototypes {

    selectedRowIds: Set<number>;
    itemIds: number[];

    checkAreAllRowsSelected(): boolean;

    selectRow(id: number): IPropsGroupStatePrototypes;

    clearRows(itemIds: number[]): IPropsGroupStatePrototypes;

    isRowSelected(id: number): boolean;

    selectAllRows(): IPropsGroupStatePrototypes;

    getSelectedRows(): number[];

    getSelectedRowsCount(): number;
}

export class GroupStatePrototypes implements IPropsGroupStatePrototypes {

    selectedRowIds: Set<number> = new Set<number>();
    itemIds = [];

    checkAreAllRowsSelected(): boolean {
        if (this.itemIds.length === 0) {
            return false;
        }

        return this.selectedRowIds.size === this.itemIds.length;
    }

    selectRow(id: number): GroupStatePrototypes {
        if (this.selectedRowIds.has(id)) {
            this.selectedRowIds.delete(id);
        } else {
            this.selectedRowIds.add(id);
        }
        return this;
    }

    clearRows(itemIds: number[]): GroupStatePrototypes {
        this.itemIds = itemIds;
        this.selectedRowIds = new Set<number>();
        return this;
    }

    isRowSelected(id: number): boolean {
        return this.selectedRowIds.has(id);
    }

    selectAllRows(): GroupStatePrototypes {
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

export interface IPropsGroupingView {
    grouping: GroupStatePrototypes;
    ngOnInit(): void;
}
