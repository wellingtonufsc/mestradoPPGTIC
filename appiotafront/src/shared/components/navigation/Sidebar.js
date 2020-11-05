import React, { useContext } from 'react';
import { FaProductHunt } from 'react-icons/fa';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AuthContext } from '../../context/auth-context';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';

const Sidebar = props => {

    const auth = useContext(AuthContext);

    return (
        <ProSidebar collapsed >
            <Menu iconShape="round" >
                <SubMenu title="Components" icon={<FaProductHunt />}>
                {props.products.length > 0 && props.products.map(product => (
                    <MenuItem>{product.name}</MenuItem>
                ))}
                {auth.userType == 'Distribuidor' && (
                    <MenuItem>Cadastrar Produto</MenuItem>
                )}
                </SubMenu>
            </Menu>
        </ProSidebar>
    )
}

export default Sidebar;