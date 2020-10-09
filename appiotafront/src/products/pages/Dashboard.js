import React from 'react';
import NavbarCustom from '../../shared/components/navigation/NavbarCustom';
import Sidebar from '../../shared/components/navigation/Sidebar';
import './Dashboard.scss';

const Dashboard = () => {

    return(
        <div className="dashboard">
            <NavbarCustom></NavbarCustom>
            <Sidebar ></Sidebar>
        </div>
    );
}

export default Dashboard;