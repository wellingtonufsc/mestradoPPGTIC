import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/UIElements/Card';
import './IotaItem.css';

const IotaItem = props => {

    const temp = props.message.substring(0, 5);
    const humi = props.message.substring(5, 7);
    const co2 = props.message.substring(7, 12);
    const lat = props.message.substring(12, 18);
    const lon = props.message.substring(18, 24);
    const d = new Date(props.timestamp);

    return (
        <li className="iota-item" key={props.hash}>
            <Card className="iota-item__content">
                <Link to="/">
                    <div className="iota-item__info">
                        <h3>hash: {props.hash}</h3>
                        <hr />
                        <h2>temperatura: {temp}</h2>
                        <h2>humidade: {humi}%</h2>
                        <h2>CO²: {co2}%</h2>
                        <h2>latitude: {lat}</h2>
                        <h2>longitude: {lon}</h2>
                        <h2>timestamp: {d.toGMTString()}</h2>
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

export default IotaItem;