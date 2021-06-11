import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import './navbar.css';
interface Props {
    createActivity: () => void;
}

const Navbar = () => {
    const {activityStore}=useStore();
  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                <img src='/assets/logo.png' alt='logo' className='logo'/>
                Reactivities
            </Menu.Item>   
            <Menu.Item name='Activities'/>
            <Menu.Item>
                <Button positive content='Create Activity' onClick={()=>activityStore.openForm()}/>
            </Menu.Item>  
        </Container>
    </Menu>
  )
};

export default Navbar;
