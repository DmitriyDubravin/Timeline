import React, { useEffect, Fragment } from 'react';
import { FaPlus } from 'react-icons/fa';
import DateString from 'components/date-string';
import DateSwitcher from 'components/date-switcher';
import PageChronometryDefault from 'components/page-chronometry-default';
import EventsList from 'components/events-list';

const PageChronometry = ({
    user,
    eventsList,
    range,
    getEvents,
    openPopupEventAdd,
}) => {

    if (!user.isAuthorized) return <PageChronometryDefault />;

    useEffect(() => {
        if (!eventsList.length) {
            getEvents();
        }
    }, [range]);

    return (
        <Fragment>
            <button
                className="add-popup-opener icon"
                onClick={openPopupEventAdd}
            >
                <FaPlus />
            </button>
            <DateString />
            <DateSwitcher />
            <h2 className="tile main-title">Chronometry page</h2>
            <EventsList eventsList={eventsList} />
        </Fragment>
    )
};

export default PageChronometry;
