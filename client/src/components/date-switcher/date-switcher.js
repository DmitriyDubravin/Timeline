import React, {Fragment} from 'react';
import {
    FaArrowLeft,
    FaArrowRight,
    FaBullseye,
    FaCalendarAlt
} from 'react-icons/fa';
import { createTodayDateObj, createPropsDateObj, propsToDate } from './../../services/time.service';

const DateSwitcher = ({
    date,
    setDate,
    openPopupDatePicker,
    getDateDayStartTSMS
}) => {


    const switchDay = modificator => {
        const {day, month, year} = date;
        setDate(createPropsDateObj({initial: propsToDate(year, month, day + modificator)}));
    }
    const switchToToday = () => {
        setDate(createTodayDateObj());
    }
    const goPrev = () => {
        switchDay(-1);
    }
    const goNext = () => {
        switchDay(1);
    }

    return (
        <Fragment>
            <button className="tile" onClick={goPrev}><FaArrowLeft /></button>
            <button className="tile" onClick={switchToToday}><FaBullseye /></button>
            <button className="tile" onClick={goNext}><FaArrowRight /></button>
            <button className="tile" onClick={openPopupDatePicker} ><FaCalendarAlt /></button>
        </Fragment>
    )
};

export default DateSwitcher;

