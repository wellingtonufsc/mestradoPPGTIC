const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const TransactionConverter = require('@iota/transaction-converter');

const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
 })


const seed = 'WUXYHYPKGITMX9ONXOJHSBCVYUJALPCXEUFJYIJQCOZIWJEZIYDC9CNLXUOEQHQWFNVZVXHMLSLHJVAP9';
const outputAddress = 'XVFJNZOZXGYWR9HFYG9WCJTLZ9HUZOPVAIIYIQNNYVVXG9VQQMKDCSIRIRQVXPBEVE99SAWGFJAWCLSHCTNONGQWDW';
const depth = 3;
const minWeightMagnitude = 9;
const tag = 'HAMILTONTCCTOKENMESSAGE';

module.exports = {
    
    async index (req, res) {

        const { temp, humi, co2, lat, lon } = req.body;

        const mensagem = temp.concat(humi, co2, lat, lon);

        const transfers = [
            {
                value: 0,
                address: outputAddress,
                tag: tag,
                message: await Converter.asciiToTrytes(mensagem)
            }
        ]

        iota.prepareTransfers(seed, transfers)
            .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
            .then(bundle => {
                res.json(bundle)
            })
            .catch(err => {
                res.json(error)
            })
    }
}