import React, { useEffect, useContext, useState } from 'react';
import NavbarCustom from '../../shared/components/navigation/NavbarCustom';
import Sidebar from '../../shared/components/navigation/Sidebar';
import api from '../../services/api';
import { AuthContext } from '../../shared/context/auth-context';
import { ToastContainer, toast } from 'react-toastify';
import './Dashboard.scss';
import AddProduct from '../components/addProduct';

const Dashboard = () => {

    const [products, setProducts] = useState({});
    const auth = useContext(AuthContext);

    useEffect(() => {
        async function getProducts() {
            api.get('/products/' + (auth.userType == 'Distribuidor' ? auth.userId : 'getExisting'))
                .then((response) => {
                    setProducts(response.data.products);
                    toast('Logado com sucesso!')
                })
                .catch((error) => {
                    toast(error.response.data.message, {type:'error'})
                });
        }
        getProducts();
    }, [auth.userId]);

    return(
        <div className="dashboard">
            <NavbarCustom></NavbarCustom>
            <Sidebar products={products}></Sidebar>
            <ToastContainer 
                position="top-left"
            />

            <div className="dashboard-content">
                <AddProduct></AddProduct>
            </div>
        </div>
    );
}

export default Dashboard;