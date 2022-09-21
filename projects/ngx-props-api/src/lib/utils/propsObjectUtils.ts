import { toJson } from './propsJsonUtils';

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

export function feedInfoUrl(url: string): Map<any, any> {

    if (!allNotNull(url)) {
        return new Map();
    }

    let info = new Map();
    const parser = new URL(url);

    info.set('protocol', parser.protocol);
    info.set('host', parser.host);
    info.set('port', parser.port);
    info.set('hostname', parser.hostname);
    info.set('querySearch', parser.search);
    info.set('queryParams', parser.searchParams);

    return info;

}

export function isEmptyMap(map: Map<any, any>): boolean {
    return map.size === 0;
}

export function isNotEmptyMap(map: Map<any, any>): boolean {
    return !isEmptyMap(map);
}

export function isEmptySet(set: Set<any>): boolean {
    return set.size === 0;
}

export function isNotEmptySet(set: Set<any>): boolean {
    return !isEmptySet(set);
}

export function asIterateMap(map: Map<any, any>): void {

    if (isEmptyMap(map)) {
        return;
    }

    map.forEach((key, value) => {
        console.log(`Key = ${key}, value = ${toJson(value)}`);
    });
}

