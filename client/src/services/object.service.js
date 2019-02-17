
export const extendObjFromProp = newKey => fn => valKey => (obj = {}) => ({
    ...obj,
    [newKey]: fn(obj[valKey])
});

export const extendObj = newKey => fn => (obj = {}) => value => ({
    ...obj,
    [newKey]: fn(value)
});

export const removeObjKey = key => obj => {
    const {[key]: any, ...rest} = obj;
    return {...rest}
}

export const changeObjKey = (from, to) => obj => {
    const {[from]: any, ...rest} = obj;
    return {...rest, [to]: obj[from]}
}
