import React from 'react';
import { FaProductHunt } from 'react-icons/fa';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';

const Sidebar = () => {

    return (
        <ProSidebar collapsed >
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