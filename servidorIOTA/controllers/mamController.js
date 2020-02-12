const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');

const mode = 'restricted';
const sideKey = 'VERYSECRETKEY';
const provider = 'https://nodes.devnet.iota.org';

let mamState = Mam.init(provider);

mamState = Mam.changeMode(mamState, mode, sideKey);

module.exports = {
    
    async sendMessage (req, res) {
        const trytes = asciiToTrytes(JSON.stringify(req.body));
        const message = Mam.create(mamState, trytes);

        mamState = message.state;

        await Mam.attach(message.payload, message.address, 3, 9)

        return res.json(message.root);
    }
}