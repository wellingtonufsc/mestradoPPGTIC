import React from 'react';

import Card from '../../shared/UIElements/Card';
import MamItem from './MamItem';
import './MamList.css';

const MamList = props => {
    if (props.items.length === 0) {
        return (
          <div className="center mam-list">
            <Card>
              <h2>No Tokens Recieved</h2>
            </Card>
          </div>
        );
    }
    
    return (
        <ul className="mam-list">
            {props.items.map(transaction => (
                <MamItem
                    message={transaction}
                />
            ))}
        </ul>
    );
};

export default MamList;