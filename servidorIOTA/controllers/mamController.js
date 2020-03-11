const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');

const mode = 'public';
const provider = 'https://nodes.devnet.iota.org';

let mamState = Mam.init(provider);

//mamState = Mam.changeMode(mamState, mode);

module.exports = {
    
    async sendMessage (req, res) {
        console.log(req.body)
        const trytes = asciiToTrytes(JSON.stringify(req.body));
        const message = Mam.create(mamState, trytes);

        mamState = message.state;

        await Mam.attach(message.payload, message.address, 3, 9)

        return res.json(message);
    },

    async publishAll (req, res) {
        await publish({
            message: req.body
        })

        return res.json('ok');
    }
}