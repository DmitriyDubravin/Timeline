
export const extendObj = fn => newKey => valKey => obj =>({...obj, [newKey]: fn(obj[valKey])});

export const removeObjKey = key => obj => {
    const {[key]: any, ...rest} = obj;
    return {...rest}
}

export const changeObjKey = (from, to) => obj => {
    const {[from]: any, ...rest} = obj;
    return {...rest, [to]: obj[from]}
}
