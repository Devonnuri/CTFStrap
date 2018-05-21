import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Challenge from '../routes/Challenge';
import Rank from '../routes/Rank';
import Login from '../routes/Login';

import config from '../ctfstrap.config.js';

export default () => (
  <Navbar color="light" light expand="md">
    <NavbarBrand href="/">{config.ctfName}</NavbarBrand>
    <Collapse navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <LinkContainer to="/challenge">
            <NavLink>Challenge</NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to="/rank">
            <NavLink>Rank</NavLink>
          </LinkContainer>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Account
          </DropdownToggle>
          <DropdownMenu right>
            <LinkContainer to="/login">
              <DropdownItem>Login</DropdownItem>
            </LinkContainer>
            <LinkContainer to="/signup">
              <DropdownItem>Sign Up</DropdownItem>
            </LinkContainer>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Collapse>
  </Navbar>
);