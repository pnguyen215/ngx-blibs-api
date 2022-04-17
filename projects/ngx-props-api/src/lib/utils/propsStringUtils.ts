import { allNotNull } from './propsObjectUtils';

export function toLowerCase(value: string): string {
    return allNotNull(value) ? value.toLowerCase() : '';
}

export function toUpperCase(value: string): string {
    return allNotNull(value) ? value.toUpperCase() : '';
}

/**
 * @param value - input
 * @description -  uppercase first char of each word.
 */
export function toProperCase(value: string): string {
    return toLowerCase(value).replace(/^\w|\s\w/g, toUpperCase);
}

/**
 * @param value - input
 * @description -  uppercase first char of each sentence and lowercase other chars.
 */
export function toSentenceCase(value: string): string {
    return toLowerCase(value).replace(/(^\w)|\.\s+(\w)/gm, toUpperCase);
}

export function trimSingleQuotes(value: string): string {

    if (!allNotNull(value)) {
        return '';
    }

    return value.replace(/  +/g, ' ');
}

export function trimSingleQuotesTabs(value: string): string {

    if (!allNotNull(value)) {
        return '';
    }

    return value.replace(/\s\s+/g, ' ');
}

