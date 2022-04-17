export function allNotNull(...values: any): boolean {

    if (values === null ||
        values === undefined ||
        values === '') {
        return false;
    }

    for (const item of values) {
        if (item === null ||
            item === undefined ||
            values === '') {
            return false;
        }
    }

    return true;
}


export function isArrayEmpty(arrays: any): boolean {

    if (!Array.isArray(arrays) || !allNotNull(arrays)) {
        return false;
    }

    return arrays.length === 0;
}








