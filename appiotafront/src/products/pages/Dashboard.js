import React from 'react';
import { useHistory } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {

    const history = useHistory();

    const onClickHandler = () => {
        history.push('/')
    }

    return(
        <div className="dashboard">
            <h1>Dashboard</h1>
            <button onClick={onClickHandler} >Voltar</button>
        </div>
    );
}

export default Dashboard;