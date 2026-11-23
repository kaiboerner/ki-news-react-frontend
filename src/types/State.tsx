import { type } from 'arktype';
import { assert } from '../util';
import { type Date, assertDate, date } from './Date';

const state = type({ dates: date.array(), index: 'number | null', current: date.or('null') });

export type State = typeof state.infer;

export function assertState(value: Partial<State>): State;
export function assertState(value: any): State {
    return assert(value, state);
}

export function createState(dates: Date[], index: number | null): State {
    const _dates = dates.map(assertDate);
    let _index = _dates.length ? Math.max(0, index ?? 0) : null;

    const current: Date | null = _index === null || _index >= _dates.length ? null : _dates[_index];

    return assertState({ dates: _dates, index: _index, current });
}
