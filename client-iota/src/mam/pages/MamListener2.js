import React, { useState, useEffect } from 'react';

import MamList from '../components/MamList';

const Mam = require('@iota/mam');
const { trytesToAscii } = require('@iota/converter');

const mode = 'restricted';
const sideKey = 'VERYSECRETKEY';
const provider = 'https://nodes.devnet.iota.org';

let mamState = Mam.init(provider);

mamState = Mam.changeMode(mamState, mode, sideKey);

const MamListener2 = () => {

    const [iotaState, setIotaState] = useState({
        root: '9J9KWRFYBRMCBWVK9AVP9FHKYGDCGISIVFBGUYPJVCDVXBBRDLJYVSZOYDDDISKDWAUWIYINAFLOVQ9MI',
        transactions: []
    });

    const getMamMessages = async () => {
        await Mam.fetch(iotaState.root, mode, sideKey, (transaction) => {
            const msg = JSON.parse(trytesToAscii(transaction));
            console.log(msg);

            if (iotaState.transactions.filter(element => element.hash === msg.hash).length === 0){
                setIotaState(prevState => ({
                    root: msg.state.channel.next_root,
                    transactions: [...prevState.transactions, msg]
                }));
            }

            
        });
    }

    useEffect(() => {

        let isCancelled = false;

        getMamMessages()
            .then (() => {
                if (!isCancelled) {
                    isCancelled = true;
                }
            })
    }, []);

    return (
        <MamList items={iotaState.transactions} />
    );
};

export default MamListener2;