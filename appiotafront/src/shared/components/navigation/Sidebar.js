import React, { useEffect, useContext } from 'react';
import { FaProductHunt } from 'react-icons/fa';
import api from '../../../services/api';
import { AuthContext } from '../../context/auth-context';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';

const Sidebar = () => {

    const auth = useContext(AuthContext);

    useEffect(() => {
        async function getProducts() {
            api.get('/products/' + auth.userId)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                toast(error.response.data.message, {type:'error'})
            });
        }
        getProducts();
    }, [auth.userId]);

    return (
        <ProSidebar collapsed >
            <ToastContainer 
                position="top-left"
            />
            <Menu iconShape="round" >
                <SubMenu title="Components" icon={<FaProductHunt />}>
                <MenuItem>Produto 1</MenuItem>
                <MenuItem>Produto 2</MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
    )
}

export default Sidebar;