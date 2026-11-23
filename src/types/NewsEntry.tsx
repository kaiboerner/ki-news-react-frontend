import { type } from 'arktype';
import { assert } from '../util';

export const newsEntry = type({
    id: 'number.integer > 0',
    url: 'string.url & /^https?:\\/\\//',
    headline: 'string',
    content: 'string',
    summary: 'string'
})

export type NewsEntry = typeof newsEntry.infer

export function assertNewsEntry(value: Partial<NewsEntry>): NewsEntry;
export function assertNewsEntry(value: any): NewsEntry {
    return assert(value, newsEntry);
}