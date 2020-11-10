import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const Mam = require('@iota/mam');
const { trytesToAscii } = require('@iota/converter');

const ViewProduct = () => {

    const [product, setProduct] = useState(null);
    const [config, setConfig] = useState(null);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState({});
    const productID = useParams().productId;

    useEffect(() => {
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
    }, []);

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

    let page = <h1>Carregando Dados...</h1>;

    if (Object.keys(message).length > 0 && message.constructor === Object) {
        
        page = Object.keys(message).map((oneKey, i) => {
            return (
                <h1 key={i}>{message[oneKey].data.temp}</h1>
            )
        });
    }

    return (
        <div>
            <ToastContainer 
                position="top-center"
            />
            <div>
                {page}
            </div>
        </div>
    )
}

export default ViewProduct;