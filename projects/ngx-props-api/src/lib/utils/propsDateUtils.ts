import { allNotNull } from './propsObjectUtils';

export class DateUtils {

    static padTo2Digits(value: number): string {

        if (!allNotNull(value)) {
            return '';
        }

        return value.toString().padStart(2, '0');
    }

    static formatToIso(date: Date): any {

        if (!allNotNull(date)) {
            return null;
        }

        return (
            [
                date.getFullYear(),
                DateUtils.padTo2Digits(date.getMonth() + 1),
                DateUtils.padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                DateUtils.padTo2Digits(date.getHours()),
                DateUtils.padTo2Digits(date.getMinutes()),
                DateUtils.padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }

    static formatDateStringToIso(date: string): any {
        return DateUtils.formatToIso(new Date(date));
    }

    static convertMillisecondsToTime(milliseconds: number): string {

        const timeDefault = '00:00:00';

        if (!allNotNull(milliseconds) || milliseconds === 0) {
            return timeDefault;
        }

        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        // If you want to roll hours over, e.g. 00 to 24
        // uncomment the line below
        // uncommenting next line gets you `00:00:00` instead of `24:00:00`  or `12:15:31` instead of `36:15:31`, etc.
        // (roll hours over)
        // hours = hours % 24;

        return `${DateUtils.padTo2Digits(hours)}:
        ${DateUtils.padTo2Digits(minutes)}:
        ${DateUtils.padTo2Digits(seconds)}`;
    }

    static calculateBetween2DatesToTime(from: Date, to: Date): string {

        if (!allNotNull(from, to)) {
            return '00:00:00';
        }

        const msBetweenDates: number = to.getTime() - from.getTime();
        return DateUtils.convertMillisecondsToTime(msBetweenDates);
    }

}
