import React, {Fragment} from 'react';
import PageHomeDefault from 'components/page-home-default';
import Donut from 'components/D3Donut';

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
