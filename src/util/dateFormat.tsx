import { type Date as AppDate } from '../types';

export function dateFormat(date: AppDate): string {
    const _date = new Date(date);
    const formatter = new Intl.DateTimeFormat('de-DE', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return formatter.format(_date);
}
