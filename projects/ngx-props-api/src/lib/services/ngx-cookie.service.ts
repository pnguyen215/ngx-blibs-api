import { Injectable } from '@angular/core';

export type SameSite = 'Lax' | 'None' | 'Strict';

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: SameSite;
}

@Injectable({
  providedIn: 'root'
})
export abstract class NgxCookieService {

  abstract hasKey(name: string): boolean;

  abstract get(name: string): string;

  abstract getAll(): { [key: string]: string };

  abstract set(
    name: string,
    value: string,
    expiresOrOptions?: CookieOptions['expires'] | CookieOptions,
    path?: CookieOptions['path'],
    domain?: CookieOptions['domain'],
    secure?: CookieOptions['secure'],
    sameSite?: SameSite
  ): void;

  abstract delete(
    name: string,
    path?: CookieOptions['path'],
    domain?: CookieOptions['domain'],
    secure?: CookieOptions['secure'],
    sameSite?: SameSite
  ): void;

  abstract deleteAll(
    path?: CookieOptions['path'],
    domain?: CookieOptions['domain'],
    secure?: CookieOptions['secure'],
    sameSite?: SameSite):
    void;
}
