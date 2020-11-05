import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';

const DashboardIndex = () => {

    const auth = useContext(AuthContext);

    return (
        <h1>Dashboard do {auth.userType}</h1>
    );
}

export default DashboardIndex;