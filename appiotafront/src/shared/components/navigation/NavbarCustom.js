import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './NavbarCustom.scss';

const NavbarCustom = () => {

    const history = useHistory();

    const onClickHandler = () => {
        history.push('/')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">Logo</Navbar.Brand>
            <Button variant="outline-info" onClick={onClickHandler}>Sair</Button>
        </Navbar>
    );
}

export default NavbarCustom;