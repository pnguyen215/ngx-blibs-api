export const SysStorages = {

    KEY_TOKEN: 'ngx_props_token_sys',
    KEY_TOKEN_USER: 'ngx_props_token_user',
    KEY_ROLE: 'ngx_props_role_sys',
    KEY_ROLE_USER: 'ngx_props_role_user',
    KEY_EXPIRATION: 'ngx_props_expiry_sys',
    KEY_EXPIRATION_USER: 'ngx_props_expiry_user',
    KEY_LANGUAGE: 'ngx_props_lang_sys',
    KEY_LANGUAGE_USER: 'ngx_props_lang_user',
    KEY_PRIVILEGES: 'ngx_props_priv_sys',
    KEY_PRIVILEGES_USER: 'ngx_props_priv_user',
    KEY_AUTHORIZATION: 'ngx_props_authorization_sys',
    KEY_AUTHORIZATION_USER: 'ngx_props_authorization_user',
    KEY_LAYOUT_CONFIG: 'ngx_props_layout_sys',
    KEY_LAYOUT_CONFIG_USER: 'ngx_props_layout_user',
    KEY_APPLICATION: 'ngx_props_app_sys',
    KEY_APPLICATION_USER: 'ngx_props_app_user',
    KEY_CACHE_REQ_MAX_AGE: 'ngx_props_cache_max_age_sys',
    KEY_CACHE_REQ_MAX_AGE_USER: 'ngx_props_cache_max_age_user'
};

export const SysValidators = {

    STRING_ONLY_NUMBER_REGULAR_EXPRESSION: /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/,
    STRING_ONLY_NUMBERS_NATIVE_REGULAR_EXPRESSION: /^\d+$/,
    STRING_EMAIL_REGULAR_EXPRESSION: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    STRING_PHONE_NUMBER_REGULAR_EXPRESSION: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    // tslint:disable-next-line: max-line-length
    STRING_URL_REGULAR_EXPRESSION: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
};


export const SysCache = {

    CACHE_MAX_AGE_VALUE: 30000
};


export const SysRequestApi = {

    REQUEST_RETRY_TIMES: 2,
    REQUEST_ENABLED_RETRY_TIMES: false
};


export const SysPropsMessage = {

    FROM_SERVER: 'from_server',
    FROM_CLIENT: 'from_client',
    FROM_UNKNOWN: 'from_unknown'
};


export enum SysHttpMethods {

    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    OPTIONS = 'options',
    PATCH = 'patch'
};

