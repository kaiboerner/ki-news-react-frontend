import { type } from 'arktype';
import { assert } from '../util';

export const date = type('string.date');

export type Date = typeof date.infer;

export function assertDate(value: any): Date {
    return assert(value, date);
}
