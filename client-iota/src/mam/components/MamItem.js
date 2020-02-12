import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/UIElements/Card';
import './MamItem.css';

const MamItem = props => {

    const { temp, humi, co2, lat, lon } = props.message;

    return (
        <li className="mam-item" key={props.hash}>
            <Card className="mam-item__content">
                <Link to="/">
                    <div className="mam-item__info">
                        <h3>hash: {props.hash}</h3>
                        <hr />
                        <h2>temperatura: {temp}</h2>
                        <h2>humidade: {humi}%</h2>
                        <h2>CO²: {co2}%</h2>
                        <h2>latitude: {lat}</h2>
                        <h2>longitude: {lon}</h2>
                        <hr />
                        <h3>value: {props.value}</h3>
                        <h3>tag: {props.tag}</h3>
                        <h3>bundle: {props.bundle}</h3>
                    </div>
                </Link>
            </Card>
        </li>
      );
};

export default MamItem;