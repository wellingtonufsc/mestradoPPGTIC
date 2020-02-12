import React from 'react';

import MamList from '../components/MamList';

const Mam = require('@iota/mam');
const { trytesToAscii } = require('@iota/converter');

const mode = 'restricted';
const sideKey = 'VERYSECRETKEY';
const provider = 'https://nodes.devnet.iota.org';
const root = '9J9KWRFYBRMCBWVK9AVP9FHKYGDCGISIVFBGUYPJVCDVXBBRDLJYVSZOYDDDISKDWAUWIYINAFLOVQ9MI';

let mamState = Mam.init(provider);

mamState = Mam.changeMode(mamState, mode, sideKey);

class MamListener extends React.Component {

    state = {
        transactions: [],
    }

    async componentDidMount() {
        this.interval = setInterval(this.getMamMessages, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getMamMessages = async () => {
        await Mam.fetch(root, mode, sideKey, transaction => {
            const msg = JSON.parse(trytesToAscii(transaction));
            console.log(msg);

            if (this.state.transactions.filter(element => element.hash === msg.hash).length === 0){
                this.setState(prevState => ({
                    transactions: [...prevState.transactions, msg]
                }))
            }

            
        });
    }


    render () {
        return (
            <MamList items={this.state.transactions} />
        );
    }
};

export default MamListener;