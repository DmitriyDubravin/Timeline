import React, {Fragment} from 'react';
import {
    FaArrowLeft,
    FaArrowRight,
    FaBullseye,
    FaCalendarAlt
} from 'react-icons/fa';

const DateSwitcher = ({
    date,
    setDate,
    openPopupDatePicker
}) => {

    console.log(date);

    const switchDay = modificator => {
        const {day, month, year} = date;
        let date1 = new Date(year, month, day + modificator);
        let newDay = date1.getDate();
        let newMonth = date1.getMonth();
        let newYear = date1.getFullYear();
        setDate({day: newDay, month: newMonth, year: newYear});
    }
    const switchToToday = () => {
        const {day, month, year} = date;
        let date1 = new Date();
        let newDay = date1.getDate();
        let newMonth = date1.getMonth();
        let newYear = date1.getFullYear();
        if (day !== newDay || month !== newMonth || year !== newYear) {
            setDate({day: newDay, month: newMonth, year: newYear});
        }
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

