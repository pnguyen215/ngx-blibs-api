import { Injectable } from '@angular/core';
import { DateUtils } from '../../utils/propsDateUtils';
import { Logger } from '../../utils/propsLoggerUtils';
import { NgxDateTimeService } from '../ngx-date-time.service';

/**
 * Past this number of days we'll no longer display the
 * day of the week and instead we'll display the date
 * with the month
 */
const DATE_WITH_MONTH_THRESHOLD_IN_DAYS = 6;

/**
 * Past this number of seconds it's now longer "now" when
 * we're displaying dates
 */
const NOW_THRESHOLD_IN_SECONDS = 10;

/**
 * Past this number of hours we'll no longer display "hours
 * ago" and instead we'll display "today"
 */
const TODAY_AT_THRESHOLD_IN_HOURS = 12;

const FORMATS = {
  YEARS_AGO: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },

  DAYS_AGO: {
    weekday: 'long',
  },
};

/**
 * Supported locales
 */
type Locale = 'en';

/**
 * Keys allowed in plural forms
 */
type PluralFormKey = '1' | '2' | '3-10' | 'other';

/**
 * Definition of a phrase's plural form
 */
interface PluralForms {
  '1'?: string;
  '2'?: string;
  '3-10'?: string;
  'other': string;
}

/**
 * Translation key/value pairs for supported locales
 */
type Translations = {
  [locale in Locale]: {
    [key: string]: string | PluralForms;
  }
};

/**
 * Representation of a date & time in components
 */
interface DateTimeComponents {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Options when formatting a date
 */
interface DateFormatOptions {
  includeYear?: boolean;
}

// ----------------------------------------------------------------------
// CONSTANTS
// ----------------------------------------------------------------------

const MILLISECONDS_TO_SECONDS = 0.001;

const SECONDS_IN_YEAR = 31557600;

const SECONDS_IN_MONTH = 2629800;

const SECONDS_IN_DAY = 86400;

const SECONDS_IN_HOUR = 3600;

const SECONDS_IN_MINUTE = 60;

// ----------------------------------------------------------------------
// i18n
// ----------------------------------------------------------------------

/**
 * Determines localized UI elements and data shown
 */
const currentLocale: Locale = 'en';

const translations: Translations = {
  en: {
    unknown: 'unknown',
    posted: 'posted',
    'just now': 'just now',
    'today at': 'today at',
    yesterday: 'yesterday',
    'hours ago': {
      1: '{count} hour ago',
      other: '{count} hours ago',
    },
    'minutes ago': {
      1: '{count} minute ago',
      other: '{count} minutes ago',
    },
    'seconds ago': {
      1: '{count} second ago',
      other: '{count} seconds ago',
    },
  },

};

@Injectable()
export class NgxDateTimeHandlerService implements NgxDateTimeService {

  protected logger = new Logger(NgxDateTimeHandlerService.name);

  renderTime(key: string, locale: Locale = currentLocale): string {
    return translations[locale][key] as string;
  }

  millisecondsToSeconds(milliseconds: number): number {
    return Math.floor(milliseconds * MILLISECONDS_TO_SECONDS);
  }

  getDateTimeComponents(timestamp: number): DateTimeComponents {
    const components: DateTimeComponents = {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    let remaining: number = timestamp;

    // years
    components.years = Math.floor(remaining / SECONDS_IN_YEAR);

    remaining -= components.years * SECONDS_IN_YEAR;

    // months
    components.months = Math.floor(remaining / SECONDS_IN_MONTH);

    remaining -= components.months * SECONDS_IN_MONTH;

    // days
    components.days = Math.floor(remaining / SECONDS_IN_DAY);

    remaining -= components.days * SECONDS_IN_DAY;

    // hours
    components.hours = Math.floor(remaining / SECONDS_IN_HOUR);

    remaining -= components.hours * SECONDS_IN_HOUR;

    // minutes
    components.minutes = Math.floor(remaining / SECONDS_IN_MINUTE);

    remaining -= components.minutes * SECONDS_IN_MINUTE;

    // seconds
    components.seconds = remaining;

    return components;
  }

  plural(key: string, count: number, locale: Locale = currentLocale): string {
    const forms = translations[locale][key] as PluralForms;

    const { other, ...definiteForms } = forms;

    const sortedDefiniteForms = Object.keys(definiteForms).sort();

    let hit = '';

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < sortedDefiniteForms.length; i += 1) {
      const currentFormKey: PluralFormKey = sortedDefiniteForms[i] as PluralFormKey;

      if (currentFormKey.includes('-')) {
        const [lowerLimit, upperLimit] = currentFormKey.split('-').map(s => parseInt(s.trim(), 10));

        if (lowerLimit <= count && count <= upperLimit) {
          // tslint:disable-next-line: no-non-null-assertion
          hit = forms[currentFormKey]!;
        }
      } else {
        if (count === parseInt(currentFormKey, 10)) {
          // tslint:disable-next-line: no-non-null-assertion
          hit = forms[currentFormKey]!;
        }
      }
    }

    if (hit === '') {
      hit = other || key;
    }

    const normalized: string = hit.replace('{count}', count.toString());

    return normalized;
  }

  // From https://community.shopify.com/c/Shopify-Design/Ordinal-Number-in-javascript-1st-2nd-3rd-4th/m-p/72156
  getOrdinal(dateValue: number): string {
    const element = ['th', 'st', 'nd', 'rd'];
    const value = dateValue % 100;
    return dateValue + (element[(value - 20) % 10] || element[value] || element[0]);
  }

  /**
   * Format an English date with it ordinal e.g. "May 1st, 1992"
   */
  formatEnglishDateWithOrdinal(date: Date, { includeYear }: DateFormatOptions): string {
    const month: string = date.toLocaleDateString('en', { month: 'long' });

    const day: string = this.getOrdinal(date.getDate());

    let formatted = `${month} ${day}`;

    if (includeYear) {
      formatted += `, ${date.getFullYear()}`;
    }

    return formatted;
  }

  /**
   * Format a non-English date
   */
  formatNonEnglishDate(locale: Locale, date: Date, { includeYear }: DateFormatOptions): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };

    if (includeYear) {
      options.year = 'numeric';
    }

    return date.toLocaleDateString(locale, options);
  }

  /**
   * For English, format a date with given options, adding an ordinal
   * e.g. "May 1st, 1992" (note the "1st"). For non-English locales,
   * format a date with given options (and no ordinal);
   */
  formatLocalizedDateWithOrdinal(locale: Locale, date: Date, options: DateFormatOptions = { includeYear: false }) {
    if (locale.toLowerCase().startsWith('en')) {
      return this.formatEnglishDateWithOrdinal(date, options);
    }

    return this.formatNonEnglishDate(locale, date, options);
  }

  humanFriendlyDate(date: Date): string {

    this.logger.warn('humanFriendlyDate($date), date = ', DateUtils.formatToIso(date));

    const unixTimestamp: number = this.millisecondsToSeconds(date.valueOf());

    const now: number = this.millisecondsToSeconds(Date.now());

    const diffComponents: DateTimeComponents = this.getDateTimeComponents(now - unixTimestamp);

    const { years, months, days, hours, minutes, seconds } = diffComponents;

    if (years > 0) {
      return this.formatLocalizedDateWithOrdinal(currentLocale, date, { includeYear: true });
    }

    if (months > 0 || days > DATE_WITH_MONTH_THRESHOLD_IN_DAYS) {
      return this.formatLocalizedDateWithOrdinal(currentLocale, date, { includeYear: false });
    }

    if (days > 1) {
      return date.toLocaleDateString(currentLocale, { weekday: 'long' });
    }

    if (days === 1) {
      return this.renderTime('yesterday');
    }

    if (hours > TODAY_AT_THRESHOLD_IN_HOURS) {
      return this.renderTime('today at') + ' ' +
        date.toLocaleTimeString(currentLocale, { hour: 'numeric', minute: '2-digit' });
    }

    if (hours > 0) {
      return this.plural('hours ago', hours);
    }

    if (minutes > 0) {
      return this.plural('minutes ago', minutes);
    }

    if (seconds > NOW_THRESHOLD_IN_SECONDS) {
      return this.plural('seconds ago', seconds);
    }

    return this.renderTime('just now');

  }
}
