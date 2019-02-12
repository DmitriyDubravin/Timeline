
export const getType = value => {
    return value === null ? 'Null' :
        value === undefined ? 'Undefined' :
        Object.prototype.toString.call(value).slice(8, -1);
}

export const isNumber = value => getType(value) === "Number";

export const lt = than => value => value < than;

export const lt1e10 = lt(10000000000);

export const isTimestamp = value => isNumber(value) && lt1e10(value);
