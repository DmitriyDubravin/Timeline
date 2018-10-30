import React from 'react';
import queryServer from './../queryServer';

export const convertNumToTwoDigits = n => ('0' + n).slice(-2);

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

