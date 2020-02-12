import React from 'react';

import Card from '../../shared/UIElements/Card';
import IotaItem from './IotaItem';
import './IotaList.css';

const IotaList = props => {
    if (props.items.length === 0) {
        return (
          <div className="center">
            <Card>
              <h2>No Tokens Recieved</h2>
            </Card>
          </div>
        );
    }
    
    return (
        <ul className="iota-list">
            {props.items.map(transaction => (
                <IotaItem
                    hash={transaction.hash}
                    message={transaction.signatureMessageFragment}
                    timestamp={transaction.timestamp}
                    tag={transaction.tag}
                    value={transaction.value}
                    bundle={transaction.bundle}
                />
            ))}
        </ul>
    );
};

export default IotaList;