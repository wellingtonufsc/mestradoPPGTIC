import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/UIElements/Card';
import './IotaItem.css';

const IotaItem = props => {
    return (
        <li className="iota-item" key={props.hash}>
            <Card className="iota-item__content">
                <Link to="/">
                    <div className="iota-item__info">
                        <h3>hash: {props.hash}</h3>
                        <hr />
                        <h2>message: {props.message}</h2>
                        <hr />
                        <h3>value: {props.value}</h3>
                        <h3>timestamp: {props.timestamp}</h3>
                        <h3>tag: {props.tag}</h3>
                        <h3>bundle: {props.bundle}</h3>
                    </div>
                </Link>
            </Card>
        </li>
      );
};

export default IotaItem;