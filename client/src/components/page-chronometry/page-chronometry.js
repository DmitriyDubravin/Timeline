import React, {Fragment} from 'react';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';
import DateString from './../DateString';
import DateSwitcher from './../DateSwitcher';
import PageChronometryDefault from './../page-chronometry-default';
import EventsList from './../events-list';

const PageChronometry = ({
    user,
    openPopupEventAdd,
    openPopupDatePicker
}) => {
    if (!user.isAuthorized) return <PageChronometryDefault />;

    return (
        <Fragment>
            <DateString />
            <button
                className="add-popup-opener icon"
                onClick={openPopupEventAdd}
            >
                <FaPlus />
            </button>
            <DateSwitcher />
            <button
                className="tile"
                onClick={openPopupDatePicker}
            >
                <FaCalendarAlt />
            </button>
            <h2 className="tile main-title">Chronometry page</h2>
            <EventsList />
        </Fragment>
    )
};

export default PageChronometry;
