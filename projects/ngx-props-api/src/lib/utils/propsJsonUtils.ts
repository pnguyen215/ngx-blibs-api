import { allNotNull } from './propsObjectUtils';

export function fromObsToJson(value: any): any {

    if (!allNotNull(value)) {
        return '';
    }

    return JSON.parse(value);
}

export function toJsonDefault(value: any): string {

    if (!allNotNull(value)) {
        return '';
    }

    return JSON.stringify(value);
}

export function toJson(value: any): string {

    if (!allNotNull(value)) {
        return '';
    }

    return JSON.stringify(value, null, 2);
}

export function toJsonIdent(value: any, identSpace: number): string {

    if (!allNotNull(value)) {
        return '';
    }

    identSpace = allNotNull(identSpace) ? identSpace : 2;
    return JSON.stringify(value, null, identSpace);
}



