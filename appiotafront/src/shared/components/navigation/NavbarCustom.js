import React, { useContext } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavbarCustom.scss';

const NavbarCustom = () => {

    const auth = useContext(AuthContext);
    const history = useHistory();

    const onClickHandler = () => {
        history.push('/')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#"><img src="img/iota-logo.png" className="img-logo-navbar" /></Navbar.Brand>
            <h1>Bem vindo, {auth.userName}!</h1>
            <Button variant="outline-info" onClick={onClickHandler} className="ml-auto" >Sair</Button>
        </Navbar>
    );
}

export default NavbarCustom;