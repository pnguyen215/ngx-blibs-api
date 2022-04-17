import * as utils from './propsObjectUtils';
import * as SysConst from './../model/enums/propsConstEnum';

export function isNumber(value: any): boolean {

    if (!utils.allNotNull(value)) {
        return false;
    }

    return SysConst.SysValidators.STRING_ONLY_NUMBER_REGULAR_EXPRESSION.test(value) ||
        SysConst.SysValidators.STRING_ONLY_NUMBERS_NATIVE_REGULAR_EXPRESSION.test(value);
}

export function isEmail(email: string): boolean {

    if (!utils.allNotNull(email)) {
        return false;
    }

    return SysConst.SysValidators.STRING_EMAIL_REGULAR_EXPRESSION.test(email);
}

export function isPhoneNumber(phoneNumber: string): boolean {

    if (!utils.allNotNull(phoneNumber)) {
        return false;
    }

    return SysConst.SysValidators.STRING_PHONE_NUMBER_REGULAR_EXPRESSION.test(phoneNumber);
}

export function isUrl(url: string): boolean {

    if (!utils.allNotNull(url)) {
        return false;
    }

    return SysConst.SysValidators.STRING_URL_REGULAR_EXPRESSION.test(url);
}

export function isPurePeriod(date: Date): boolean {

    if (!utils.allNotNull(date)) {
        return false;
    }

    return !isNaN(date.getTime());
}
