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

    useEffect(async () => {
        const response = await api.get('/products/' + auth.userId);

        const { status } = response.data;

        if(status == 500) {
            toast(response.data.message, {type:'error'});
        }
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