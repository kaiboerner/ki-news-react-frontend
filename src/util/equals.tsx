export function equals(v1: any, v2: any): boolean {
    if (v1 === v2) {
        return true;
    }
    if (v1 === null || v1 === undefined) {
        return false;
    }
    if (Array.isArray(v1)) {
        return equalsArray(v1, v2);
    }
    if (typeof v1 === 'object') {
        return equalsObject(v1, v2);
    }
    return false;
}

function equalsArray(v1: any[], v2: any): boolean {
    if (!Array.isArray(v2)) {
        return false
    }
    if (v1.length !== v2.length) {
        return false;
    }
    for (const i in v1) {
        if (!equals(v1[ i ], v2[ i ])) {
            return false
        }
    }

    return true
}

function equalsObject(v1: any, v2: any): boolean {
    if (typeof v1 !== 'object' || typeof v2 !== 'object') {
        return false;
    }

    let i: keyof typeof v1;
    for (i in v1) {
        if (!Object.hasOwn(v2, i)) {
            return false
        }
        const vv1 = v1[ i ];
        const vv2 = v2[ i ];
        if (!equals(vv1, vv2)) {
            return false;
        }
    }
    return equalsObject(v2, v1);
}