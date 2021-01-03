import React, { useContext } from 'react';
import { FaProductHunt } from 'react-icons/fa';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AuthContext } from '../../context/auth-context';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';

const Sidebar = props => {

    const auth = useContext(AuthContext);

    return (
        <ProSidebar collapsed >
            <Menu iconShape="round" >
                <SubMenu title="Components" icon={<FaProductHunt />}>
                {props.products.length > 0 && props.products.map(product => (
                        <MenuItem key={product._id}>
                            <Link to={'/dashboard/product/view/' + product._id}>
                                {product.name}
                            </Link>
                        </MenuItem>
                ))}
                {auth.userType === 'Distribuidor' && (
                    <MenuItem>
                        <Link to="/dashboard/product/add">
                            Cadastrar Viagem
                        </Link>
                    </MenuItem>
                )}
                </SubMenu>
            </Menu>
        </ProSidebar>
    )
}

export default Sidebar;