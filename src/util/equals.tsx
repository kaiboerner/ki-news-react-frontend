export function equals<T>(v1: T, v2: T): boolean {
    if (v1 === v2) {
        return true;
    }
    if (v1 === null || v1 === undefined) {
        return false;
    }
    if (typeof v1 === 'object') {
        let i: keyof typeof v1;
        for (i in v1) {
            const vv1 = v1[ i ];
            const vv2 = v2[ i ];
            if (!equals(vv1, vv2)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
