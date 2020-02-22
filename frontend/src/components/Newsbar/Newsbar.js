import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Navbar, NavbarBrand} from 'reactstrap';

const Newsbar = () => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">NEWS</NavbarBrand>
        </Navbar>
    );
};

export default Newsbar;