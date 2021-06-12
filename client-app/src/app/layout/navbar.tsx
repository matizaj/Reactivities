import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import './navbar.css';

const Navbar = () => {
  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item as={NavLink} to="/" exact header>
                <img src='/assets/logo.png' alt='logo' className='logo'/>
                Reactivities
            </Menu.Item>   
            <Menu.Item as={NavLink} to="/activities" name='Activities'/>
            <Menu.Item>
                <Button positive content='Create Activity' as={NavLink} to="/createActivity"/>
            </Menu.Item>  
        </Container>
    </Menu>
  )
};

export default Navbar;
