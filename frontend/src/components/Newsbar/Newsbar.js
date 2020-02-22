import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';

const Newsbar = () => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">NEWS</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/" exact>Posts</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Newsbar;