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
    
                result.messages.forEach(message => {
                    const msg = JSON.parse(trytesToAscii(message));
                    msgs.push(msg);
                });

                setMessage(Object.assign({}, msgs));
            }
    
            addListenerMam();
        }
    }, [product, config]);

    let page = <div className="graphs"><h1>Carregando Dados...</h1></div>;
    let temp = [], lat = [], lon = [], time = [];

    if (Object.keys(message).length > 0 && message.constructor === Object) {

        for (let i = 0; i < Object.keys(message).length; i++) {
            temp.push(message[i].data.temp);
            lat.push(message[i].data.lat);
            lon.push(message[i].data.lon);
            time.push(message[i].timestamp);
        }

        page = <div className="graphs">
                <Temperature temp={temp} time={time} root={product.first_root} config={config} />
                <Localization lat={lat} lon={lon} time={time} root={product.first_root} config={config} />
            </div>;
    } else {
        page = <div className="graphs"><h1>Carregando Dados...</h1></div>;
    }

    return (
        <div className="view-page" >
            <ToastContainer 
                position="top-center"
            />
            {user && (
                <h1 className="main-title" >{product.name} do {user}</h1>
            )}
            <hr />
            {page}
        </div>
    )
}

export default ViewProduct;