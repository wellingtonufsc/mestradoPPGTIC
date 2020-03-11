import React from 'react';

import MamList from '../components/MamList';

const Mam = require('@iota/mam');
const { trytesToAscii } = require('@iota/converter');

const mode = 'public';
const provider = 'https://nodes.devnet.iota.org';
const root = 'XVFVCWLBODYHVNLMBBIUAIN9QYHQKMYZNDYTLUUWVZOBGUREABZHDFVBIORLCEYXLFTKDHRSPYHCYFWWJ';

let mamState = Mam.init(provider);

//mamState = Mam.changeMode(mamState, mode);

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
        const result = await Mam.fetch(root, mode);
        let msgs = [];
        result.messages.forEach(message => {
            const msg = JSON.parse(trytesToAscii(message));
            msgs.push(msg)
        })

        this.setState({ transactions: msgs });
    }


    render () {
        return (
            <MamList items={this.state.transactions} />
        );
    }
};

export default MamListener;