import React, { useEffect, useContext, useState } from 'react';
import NavbarCustom from '../../shared/components/navigation/NavbarCustom';
import Sidebar from '../../shared/components/navigation/Sidebar';
import api from '../../services/api';
import { AuthContext } from '../../shared/context/auth-context';
import { ToastContainer, toast } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import AddProduct from '../components/addProduct';
import ViewProduct from '../components/ViewProduct';
import DashboardIndex from '../components/DashboardIndex';
import './Dashboard.scss';

const Dashboard = () => {

    const [reload, setReload] = useState(false);
    const [products, setProducts] = useState({});
    const auth = useContext(AuthContext);

    useEffect(() => {
        toast('Logado com sucesso!', {type:'dark'})
    }, []);

    useEffect(() => {
        async function getProducts() {
            api.get('/products/' + (auth.userType === 'Distribuidor' ? auth.userId : 'getExisting'))
                .then((response) => {
                    setProducts(response.data.products);
                })
                .catch((error) => {
                    toast(error.response.data.message, {type:'error'})
                });
        }
        getProducts();
    }, [auth.userId, auth.userType, reload]);

    return(
        <div className="dashboard">
            <NavbarCustom></NavbarCustom>
            <Sidebar products={products}></Sidebar>
            <ToastContainer 
                position="top-center"
            />

            <div className="dashboard-content">
                <Route render={({ match: { url } }) => (
                    <Switch>
                        <Route path={url + "/product/view/:productId"} exact render={() => <ViewProduct />} />
                        <Route path={url + "/product/add"} render={() => <AddProduct reset={() => setReload(prev => (!prev))}/>} />
                        <Route path={url} render={() => <DashboardIndex />} />
                    </Switch>
                )} />
            </div>
        </div>
    );
}

export default Dashboard;