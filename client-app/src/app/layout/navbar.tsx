import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import './navbar.css';
interface Props {
    createActivity: () => void;
}

const Navbar = (props: Props) => {
  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                <img src='/assets/logo.png' alt='logo' className='logo'/>
                Reactivities
            </Menu.Item>   
            <Menu.Item name='Activities'/>
            <Menu.Item>
                <Button positive content='Create Activity' onClick={props.createActivity}/>
            </Menu.Item>  
        </Container>
    </Menu>
  )
};

export default Navbar;
