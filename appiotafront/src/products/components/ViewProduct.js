import React from 'react';
import { useParams } from 'react-router-dom';

const ViewProduct = () => {

    const productId = useParams().productId;

    return (
        <h1>View do Produto com id: {productId}</h1>
    )
}

export default ViewProduct;