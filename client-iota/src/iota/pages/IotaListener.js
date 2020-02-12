import React from 'react';

import IotaList from '../components/IotaList';

const Iota = require('@iota/core');
const Converter = require('@iota/converter');

const iota = Iota.composeAPI({
   provider: 'https://nodes.devnet.iota.org:443'
});

const listenAddress = 'XVFJNZOZXGYWR9HFYG9WCJTLZ9HUZOPVAIIYIQNNYVVXG9VQQMKDCSIRIRQVXPBEVE99SAWGFJAWCLSHCTNONGQWDW'
const tag = 'HAMILTONTCCFIRSTMESSAGE';

const query = {
    addresses: [listenAddress],
    tags: [tag]
}

class IotaListener extends React.Component {

    state = {
        transactions: [],
    }

    async componentDidMount() {
        this.interval = setInterval(this.getIotaMessages, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getIotaMessages = async () => {

        iota.findTransactionObjects(query)
            .then(transactions => {
                transactions.map(transaction => {
                    const msg = Converter.trytesToAscii(transaction.signatureMessageFragment.replace(/9*$/, ''));

                    if (this.state.transactions.filter(element => element.hash === transaction.hash).length === 0){
                        transaction.signatureMessageFragment = msg
                        const newTransaction = transaction
                        this.setState(prevState => ({
                            transactions: [...prevState.transactions, newTransaction]
                        }))
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){

        return (
            <IotaList items={this.state.transactions} />
        )
    }
}

export default IotaListener;