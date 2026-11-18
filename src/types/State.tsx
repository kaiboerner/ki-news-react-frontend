import { type } from 'arktype';
import { assert } from '../util';

const date = type("string.date");

const state = type({
    dates: date.array(),
    index: 'number',
    current: date.or("null"),
    canGoBack: 'boolean',
    canGoForward: 'boolean'
});

export type Date = typeof date.infer;
export type State = typeof state.infer;

export function assertState(value: any): State {
    return assert(value, state);
}

export function createState(dates: Date[], index: number): State {
    const _dates = dates.map(d => assert(d, date));
    const current: Date | null =
        index < 0 || index >= _dates.length ? null : _dates[ index ];
    const canGoBack = index > 0;
    const canGoForward = index < _dates.length - 1;

    return assertState({ dates: _dates, index, current, canGoBack, canGoForward });
}
