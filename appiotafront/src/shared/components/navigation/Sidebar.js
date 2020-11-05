import React, { useContext } from 'react';
import { FaProductHunt } from 'react-icons/fa';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AuthContext } from '../../context/auth-context';
import { NavLink } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';

const Sidebar = props => {

    const auth = useContext(AuthContext);

    return (
        <ProSidebar collapsed >
            <Menu iconShape="round" >
                <SubMenu title="Components" icon={<FaProductHunt />}>
                {props.products.length > 0 && props.products.map(product => (
                    <NavLink to="/dashboard/product/view/{{product._id}}" key={product._id}>
                        <MenuItem >{product.name}</MenuItem>
                    </NavLink>
                ))}
                {auth.userType === 'Distribuidor' && (
                    <NavLink to="/dashboard/product/add">
                        <MenuItem>Cadastrar Produto</MenuItem>
                    </NavLink>
                )}
                </SubMenu>
            </Menu>
        </ProSidebar>
    )
}

export default Sidebar;