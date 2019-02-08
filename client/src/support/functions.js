import React from 'react';
import queryServer from './../queryServer';
import QS from 'query-string';

// export const convertNumToTwoDigits = n => ('0' + n).slice(-2);
export const convertNumToTwoDigits = n => n < 10 ? '0' + n : '' + n;

export const timestampToTimeObj = timestamp => {
    let time = timestamp.toString();
    if (time.length < 11) time += '000';
    const date = new Date(+time);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hour = convertNumToTwoDigits(date.getUTCHours());
    const minute = convertNumToTwoDigits(date.getUTCMinutes());
    return {year, month, day, hour, minute}
}

export const getRange = (start, finish) => {
    let {day: sDay, month: sMonth, year: sYear} = start;
    let {day: fDay, month: fMonth, year: fYear} = finish;
    return {
        start: Math.floor(+new Date(Date.UTC(sYear, sMonth, sDay)) / 1000),
        finish: Math.floor(+new Date(Date.UTC(fYear, fMonth, fDay, 23, 59, 59)) / 1000)
    }
}

export const extendEventWithHoursMinutes = event => {
    const {hour: startHour, minute: startMinute} = timestampToTimeObj(event.start);
    const {hour: finishHour, minute: finishMinute} = timestampToTimeObj(event.finish);
    return {...event, startHour, startMinute, finishHour, finishMinute};
}

export const withData = conditionFn => Component => props => {
    return conditionFn(props) ? <Component {...props} /> : null;
}

export const withQuery = queryFn => Component => class extends React.Component {
    componentDidMount() {
        const {path, data, sendConditions} = queryFn(this.props);
        if (sendConditions && sendConditions.some(fn => fn(this.props))) {
            this.queryAPI(path, data);
        }
    }
    componentDidUpdate(prevProps) {
        const {path, data, resendConditions} = queryFn(this.props);
        if (resendConditions && resendConditions.every(fn => fn(prevProps, this.props))) {
            this.queryAPI(path, data);
        }
    }
    handleServerResponse = response => {
        const {callback} = queryFn(this.props);
        callback(response.data);
    }
    queryAPI = (path, data) => {
        queryServer({
            path: path,
            data: data,
            callback: this.handleServerResponse
        });
    }
    render() {
        return <Component {...this.props} />
    }
}

export const tryCatch = promise => promise
    .then(data => ({...data}))
    .catch(err => ({err}));

export const removeEmptyKeys = obj => {
    const cleanObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && !!obj[key]) {
            cleanObj[key] = obj[key];
        }
    }
    return cleanObj;
}

export const checkTypes = (args, types) => {
    for (let i = 0; i < types.length; i++) {
        let value = args[i];
        let expectedValueType = types[i];
        let valueType = value === null ? 'Null' :
            value === undefined ? 'Undefined' :
            Object.prototype.toString.call(value).slice(8, -1);
        if (valueType !== expectedValueType) {
            throw new Error(`${i} parameter type should be ${expectedValueType} ! \n Got:\n type: ${valueType}\n value: ${value}`);
        }
    }
}

export const getType = value => {
    return value === null ? 'Null' :
        value === undefined ? 'Undefined' :
        Object.prototype.toString.call(value).slice(8, -1);
}

export const checkModel = model => data => {
    let result = Object.keys(model).every(key => {
        return data[key] && model[key].some(modelType => {
            return getType(data[key]) === modelType
        })
    });
    if (!result) {
        console.log('model: ', model);
        console.log('data: ', data);
        throw new Error(`model check failed`);
    } else {
        return data;
    }
}

const eventModel = {
    start: ['String', 'Number'],
    finish: ['String', 'Number'],
}

export const checkEventModel = checkModel(eventModel);


export const compose = (...fns) =>
  fns.reduceRight((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)),
    value => value
  );

export const objectify = str => {
  return QS.parse(str);
}

export const stringify = obj => {
  return QS.stringify(obj);
}

export const querify = obj => {
  const str = stringify(obj);
  return str.length > 1 ? "?" + str : '';
}



