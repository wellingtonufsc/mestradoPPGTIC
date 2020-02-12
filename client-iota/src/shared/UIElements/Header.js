import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <header className="main-header">
            <nav className="main-navigation__header-nav">
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" exact>
                        Iota Normal
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mam" exact>
                        Iota MAM
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;