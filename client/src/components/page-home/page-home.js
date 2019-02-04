import React, {Fragment} from 'react';
import PageHomeDefault from './../page-home-default';
import Donut from './../D3Donut';

const PageHome = ({
    user
}) => {

    if (!user.isAuthorized) return <PageHomeDefault />;

    return (
        <Fragment>
            <h2>Home page</h2>
            <Donut />
        </Fragment>
    );
};

export default PageHome;
