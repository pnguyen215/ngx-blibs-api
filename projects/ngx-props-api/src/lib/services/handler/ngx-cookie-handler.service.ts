import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CookieOptions, NgxCookieService, SameSite } from '../ngx-cookie.service';

@Injectable()
export class NgxCookieHandlerService implements NgxCookieService {

  private readonly documentIsAccessible: boolean;
  // tslint:disable-next-line: variable-name
  private _document?: Document;

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this._document = document as Document;
    this.documentIsAccessible = isPlatformBrowser(this.platformId);
  }

  /**
   * Get cookie Regular Expression
   *
   * @param name Cookie name
   * @returns property RegExp
   */
  private static getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');

    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }

  /**
   * Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI).
   *
   * @param encodedURIComponent A value representing an encoded URI component.
   *
   * @returns The unencoded version of an encoded component of a Uniform Resource Identifier (URI).
   *
   */
  private static safeDecodeURIComponent(encodedURIComponent: string): string {
    try {
      return decodeURIComponent(encodedURIComponent);
    } catch {
      return encodedURIComponent;
    }
  }

  /**
   * Return `true` if {@link Document} is accessible, otherwise return `false`
   *
   * @param name Cookie name
   * @returns boolean - whether cookie with specified name exists
   *
   */
  hasKey(name: string): boolean {
    if (!this.documentIsAccessible) {
      return false;
    }
    name = encodeURIComponent(name);
    const regExp: RegExp = NgxCookieHandlerService.getCookieRegExp(name);
    return regExp.test(this._document.cookie);
  }

  /**
   * Get cookies by name
   *
   * @param name Cookie name
   * @returns property value
   *
   */
  get(name: string): string {
    if (this.documentIsAccessible && this.hasKey(name)) {
      name = encodeURIComponent(name);

      const regExp: RegExp = NgxCookieHandlerService.getCookieRegExp(name);
      const result: RegExpExecArray = regExp.exec(this._document.cookie);

      return result[1] ? NgxCookieHandlerService.safeDecodeURIComponent(result[1]) : '';
    } else {
      return '';
    }
  }

  /**
   * Get all cookies in JSON format
   *
   * @returns all the cookies in json
   *
   */
  getAll(): { [key: string]: string } {
    if (!this.documentIsAccessible) {
      return {};
    }

    const cookies: { [key: string]: string } = {};
    const document: any = this._document;

    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach((currentCookie) => {
        const [cookieName, cookieValue] = currentCookie.split('=');
        // tslint:disable-next-line: max-line-length
        cookies[NgxCookieHandlerService.safeDecodeURIComponent(cookieName.replace(/^ /, ''))] = NgxCookieHandlerService.safeDecodeURIComponent(cookieValue);
      });
    }

    return cookies;
  }

  /**
   * Set cookie based on provided information
   *
   * @param name     Cookie name
   * @param value    Cookie value
   * @param expires  Number of days until the cookies expires or an actual `Date`
   * @param path     Cookie path
   * @param domain   Cookie domain
   * @param secure   Secure flag
   * @param sameSite Same-site token `Lax`, `None`, or `Strict`. Defaults to `Lax`
   *
   */
  set(
    name: string,
    value: string,
    expires?: CookieOptions['expires'],
    path?: CookieOptions['path'],
    domain?: CookieOptions['domain'],
    secure?: CookieOptions['secure'],
    sameSite?: SameSite
  ): void;

  /**
   * Set cookie based on provided information
   *
   * Cookie's parameters:
   * <pre>
   * expires  Number of days until the cookies expires or an actual `Date`
   * path     Cookie path
   * domain   Cookie domain
   * secure   Secure flag
   * sameSite Same-site token `Lax`, `None`, or `Strict`. Defaults to `Lax`
   * </pre>
   *
   * @param name     Cookie name
   * @param value    Cookie value
   * @param options  Body with cookie's params
   *
   */
  set(name: string, value: string, options?: CookieOptions): void;

  set(
    name: string,
    value: string,
    expiresOrOptions?: CookieOptions['expires'] | CookieOptions,
    path?: CookieOptions['path'],
    domain?: CookieOptions['domain'],
    secure?: CookieOptions['secure'],
    sameSite?: SameSite
  ): void {
    if (!this.documentIsAccessible) {
      return;
    }

    if (typeof expiresOrOptions === 'number' || expiresOrOptions instanceof Date || path || domain || secure || sameSite) {
      const optionsBody = {
        expires: expiresOrOptions as CookieOptions['expires'],
        path,
        domain,
        secure,
        sameSite: sameSite ? sameSite : 'Lax',
      };

      this.set(name, value, optionsBody);
      return;
    }

    let cookieString: string = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

    const options = expiresOrOptions ? expiresOrOptions : {};

    if (options.expires) {
      if (typeof options.expires === 'number') {
        const dateExpires: Date = new Date(new Date().getTime() + options.expires * 1000 * 60 * 60 * 24);

        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      } else {
        cookieString += 'expires=' + options.expires.toUTCString() + ';';
      }
    }

    if (options.path) {
      cookieString += 'path=' + options.path + ';';
    }

    if (options.domain) {
      cookieString += 'domain=' + options.domain + ';';
    }

    if (options.secure === false && options.sameSite === 'None') {
      options.secure = true;
      console.warn(
        `[ngx-cookie-service] Cookie ${name} was forced with secure flag because sameSite=None.`
      );
    }
    if (options.secure) {
      cookieString += 'secure;';
    }

    if (!options.sameSite) {
      options.sameSite = 'Lax';
    }

    cookieString += 'sameSite=' + options.sameSite + ';';

    this._document.cookie = cookieString;
  }

  /**
   * Delete cookie by name
   *
   * @param name   Cookie name
   * @param path   Cookie path
   * @param domain Cookie domain
   * @param secure Cookie secure flag
   * @param sameSite Cookie sameSite flag - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
   *
   */
  delete(
    name: string,
    path?: CookieOptions['path'],
    domain?: CookieOptions['domain'],
    secure?: CookieOptions['secure'],
    sameSite: SameSite = 'Lax'): void {

    if (!this.documentIsAccessible) {
      return;
    }

    sameSite = sameSite ? sameSite : 'Lax';
    const expiresDate = new Date('Thu, 01 Jan 1970 00:00:01 GMT');
    this.set(name, '', { expires: expiresDate, path, domain, secure, sameSite });
  }

  /**
   * Delete all cookies
   *
   * @param path   Cookie path
   * @param domain Cookie domain
   * @param secure Is the Cookie secure
   * @param sameSite Is the cookie same site
   *
   */
  deleteAll(
    path?: CookieOptions['path'],
    domain?: CookieOptions['domain'],
    secure?: CookieOptions['secure'],
    sameSite: SameSite = 'Lax'): void {
    if (!this.documentIsAccessible) {
      return;
    }

    const cookies: any = this.getAll();

    for (const cookieName in cookies) {
      if (cookies.hasOwnProperty(cookieName)) {
        this.delete(cookieName, path, domain, secure, sameSite);
      }
    }
  }
}
