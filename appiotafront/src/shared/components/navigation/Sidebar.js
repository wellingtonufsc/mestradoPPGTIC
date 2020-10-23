import React from 'react';
import { FaProductHunt } from 'react-icons/fa';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';

const Sidebar = props => {

    return (
        <ProSidebar collapsed >
            <Menu iconShape="round" >
                <SubMenu title="Components" icon={<FaProductHunt />}>
                {console.log(props.products.length)}
                {props.products.length > 0 && props.products.forEach(product => {
                    return(
                        <MenuItem>{product.name}</MenuItem>
                    )
                })}
                <MenuItem>Cadastrar Produto</MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
    )
}

export default Sidebar;