import React, { useEffect, useContext, useState } from 'react';
import NavbarCustom from '../../shared/components/navigation/NavbarCustom';
import Sidebar from '../../shared/components/navigation/Sidebar';
import api from '../../services/api';
import { AuthContext } from '../../shared/context/auth-context';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import AddProduct from '../components/addProduct';
import ViewProduct from '../components/ViewProduct';
import './Dashboard.scss';

const Dashboard = () => {

    const [products, setProducts] = useState({});
    const auth = useContext(AuthContext);

    useEffect(() => {
        async function getProducts() {
            api.get('/products/' + (auth.userType === 'Distribuidor' ? auth.userId : 'getExisting'))
                .then((response) => {
                    setProducts(response.data.products);
                    toast('Logado com sucesso!')
                })
                .catch((error) => {
                    toast(error.response.data.message, {type:'error'})
                });
        }
        getProducts();
    }, [auth.userId, auth.userType]);

    return(
        <div className="dashboard">
            <NavbarCustom></NavbarCustom>
            <Sidebar products={products}></Sidebar>
            <ToastContainer 
                position="top-left"
            />

            <div className="dashboard-content">
                <BrowserRouter>
                    <Switch>
                        <Route path="/dashboard/product/view/:productId" exact>
                            <ViewProduct></ViewProduct>
                        </Route>
                        <Route path="/dashboard/product/add">
                            <AddProduct></AddProduct>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default Dashboard;