import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const ViewProduct = () => {

    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const productID = useParams().productId;

    useEffect(() => {
        async function getProduct() {
            api.get('/products/view/' + productID)
                .then((response) => {
                    setProduct(response.data.product);
                    api.get('/users/view/' + response.data.product.user_id)
                        .then((response) => {
                            setUser(response.data.user.name);
                        })
                        .catch((error) => {
                            toast(error.response.data.message, {type:'error'});
                        });
                })
                .catch((error) => {
                    toast(error.response.data.message, {type:'error'});
                });
        }
        getProduct();
    }, []);

    return (
        <div>
            <ToastContainer 
                position="top-center"
            />
            {product && (
                <div>
                    <h1>Name: {product.name}</h1>
                    <h1>First Root: {product.first_root}</h1>
                    {user && (
                        <h1>Usuário: {user}</h1>
                    )}
                </div>
            )}
            {!product && (
                <h1>Nenhum produto encontrado :(</h1>
            )}
        </div>
    )
}

export default ViewProduct;