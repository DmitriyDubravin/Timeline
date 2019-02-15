import React, {Fragment} from 'react';
import { FaPlus } from 'react-icons/fa';
import DateString from './../DateString';
import DateSwitcher from './../date-switcher';
import PageChronometryDefault from './../page-chronometry-default';
import EventsList from './../events-list';

const PageChronometry = ({
    user,
    openPopupEventAdd,
}) => {

    if (!user.isAuthorized) return <PageChronometryDefault />;

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
            <EventsList />
        </Fragment>
    )
};

export default PageChronometry;
