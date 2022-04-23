import { IRecordsState } from '../model/base/props-generic-prototypes.model';


export function filterArray(incomingArray: any[], requestRecord: IRecordsState): any[] {

    if (!requestRecord || !requestRecord.filter) {
        return incomingArray;
    }

    let result: any[] = incomingArray;
    const filtrationFields = Object.keys(requestRecord.filter);

    filtrationFields.forEach((keyName: string) => {
        result = result.filter(element => element[keyName] == requestRecord.filter[keyName]);
    });

    return result;
}

export function searchInArray(incomingArray: any[], searchTerm: string = ''): any[] {
    if (!searchTerm) {
        return incomingArray;
    }

    const acceptableForSearchTypes = { number: 1, string: 2 };

    const result = incomingArray.filter(row => {
        let termIsFoundInRow = false;
        const keys = Object.keys(row).filter(keyName => acceptableForSearchTypes[typeof row[keyName]] && row[keyName]);
        for (const keyName of keys) {
            if (row[keyName].toString().toLowerCase().indexOf(searchTerm) > -1) {
                termIsFoundInRow = true;
                break;
            }
        }
        return termIsFoundInRow;
    });

    return result;
}

export function sortArray(incomingArray: any[], sortField: string = '', sortOrder: string = 'asc'): any[] {
    if (!sortField) {
        return incomingArray;
    }

    let result: any[] = [];
    result = incomingArray.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
            return sortOrder === 'asc' ? -1 : 1;
        }

        if (a[sortField] > b[sortField]) {
            return sortOrder === 'asc' ? 1 : -1;
        }

        return 0;
    });
    return result;
}

export function baseFilter(entities: any[], requestRecord: IRecordsState) {
    // Filtration
    let entitiesResult = filterArray(entities, requestRecord);
    // Search
    entitiesResult = searchInArray(entitiesResult, requestRecord.searchTerm);

    // Sorting
    // start
    if (requestRecord.sorting.column) {
        entitiesResult = sortArray(entitiesResult, requestRecord.sorting.column, requestRecord.sorting.direction);
    }
    // end

    // Paginator
    // start
    const totalCount = entitiesResult.length;
    const startPosition = (requestRecord.paginator.page - 1) * requestRecord.paginator.pageSize;
    const endPosition = startPosition + requestRecord.paginator.pageSize;
    entitiesResult = entitiesResult.slice(startPosition, endPosition);
    // end

    const responseRecord = {
        items: entitiesResult,
        total: totalCount,
        startPosition,
        endPosition
    };

    return responseRecord;
}