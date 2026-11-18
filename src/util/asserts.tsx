import { type } from 'arktype';

type Callable<T, U> = (t: T) => U | type.errors;

export function assert<T, U>(value: any, t: Callable<T, U>): U {
    const parsed = t(value);

    if (parsed instanceof type.errors) {
        throw new Error(`INVALID_INPUT: ${parsed.summary}`);
    }

    return parsed;
}
