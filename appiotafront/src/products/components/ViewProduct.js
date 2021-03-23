import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Temperature from '../../shared/components/graphs/Temperature';
import Localization from '../../shared/components/graphs/Localization';
import api from '../../services/api';
import './ViewProduct.scss';

const Mam = require('@iota/mam');
const { trytesToAscii } = require('@iota/converter');

const ViewProduct = () => {

    const [view, setView] = useState(true);
    const [product, setProduct] = useState(null);
    const [config, setConfig] = useState(null);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState({});
    const productID = useParams().productId;

    useEffect(() => {
        setMessage({});
        async function getProduct() {
            api.get('/products/view/' + productID)
                .then((response) => {
                    api.get('/users/view/' + response.data.product.user_id)
                        .then((response) => {
                            setUser(response.data.user.name);
                        })
                        .catch((error) => {
                            toast(error.response.data.message, {type:'error'});
                        });

                        setProduct(response.data.product);
                })
                .catch((error) => {
                    toast(error.response.data.message, {type:'error'});
                });
        }

        async function getConfig() {
            api.get('/products/loadConfig')
                .then((response) => {
                    setConfig(response.data.config);
                })
                .catch((error) => {
                    toast(error.response.data.message, {type:'error'});
                });
        }

        getProduct();
        getConfig();
    }, [productID]);

    useEffect(() => {
        if (product && config) {
            async function addListenerMam() {
                Mam.init(config.mam_provider);
                const result = await Mam.fetch(product.first_root, config.mam_mode);
                let msgs = [];
    
                if (result && result.messages) {
                    result.messages.forEach(message => {
                        const msg = JSON.parse(trytesToAscii(message));
                        msgs.push(msg);
                    });

                    setMessage(Object.assign({}, msgs));
                }

                setTimeout(addListenerMam(), 10000);
            }
    
            addListenerMam()
        }
    }, [product, config]);

    let page = <div className="graphs"><h1>Carregando Dados...</h1></div>;
    let temp = [], lat = [], lon = [], timeTemp = [], timeLoc = [];

    if (Object.keys(message).length > 0 && message.constructor === Object) {

        for (let i = 0; i < Object.keys(message).length; i++)
        {
            for (var signalIndex in message[i].signals)
            {
                if (message[i].signals[signalIndex].UUID === "temperature") {
                    for (var logIndex in message[i].signals[signalIndex].logs) {
                        temp.push(message[i].signals[signalIndex].logs[logIndex].value);
                        timeTemp.push(Date.parse(message[i].signals[signalIndex].logs[logIndex].date)/1000);
                    }
                } else if (message[i].signals[signalIndex].UUID === "positionDOTS") {
                    for (logIndex in message[i].signals[signalIndex].logs) {
                        lat.push(message[i].signals[signalIndex].logs[logIndex].value.lat);
                        lon.push(message[i].signals[signalIndex].logs[logIndex].value.lng);
                        timeLoc.push(Date.parse(message[i].signals[signalIndex].logs[logIndex].date)/1000);
                    }
                }
            }
        }

        if (view) {
            page = <div className="graphs">
                <Temperature temp={temp} time={timeTemp} root={product.first_root} config={config} />
            </div>;
        } else {
            page = <div className="graphs">
                <Localization lat={lat} lon={lon} time={timeLoc} root={product.first_root} config={config} />
            </div>;
        }
    } else {
        page = <div className="graphs"><h1>Carregando Dados...</h1></div>;
    }

    return (
        <div className="view-page" >
            {user && (
                <div className="view-header">
                    <h1 className="main-title" >{product.name} do {user} {product.destination ? ', fazendo o percurso ' + product.destination : ''}</h1>
                    <div className="buttons">
                        <button className={view === true ? 'temperature active' : 'temperature'} onClick={() => setView(true)}>Temperatura</button>
                        <button className={view === false ? 'localization active' : 'localization'} onClick={() => setView(false)}>Localização</button>
                    </div>
                </div>
            )}
            <hr />
            {page}
        </div>
    )
}

export default ViewProduct;