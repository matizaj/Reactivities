import { observer } from "mobx-react-lite";
import React from "react"
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function Home(){
  const {userStore, modalStore} = useStore();
  return (
    <div>
      <Segment  inverted textAlign='center' vertical className='masthead'>
          <Container>
            <Header as='h1'inverted>
              <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
              Reactivities
              
              {userStore.isLoggedIn ? (
                <>
                  <Header  inverted content='Welcome to Reactivities'/>
                  <Button as={Link} to='/activities' inverted size='huge'>Go To Activities!</Button>
                </>
              ): (
                <>
                <Header  inverted content='Welcome to Reactivities'/>
                  <Button onClick={()=>modalStore.openModal(<LoginForm/>)} to='/login' inverted size='huge'>Login!</Button>
                  <Button onClick={()=>modalStore.openModal(<RegisterForm/>)} to='/login' inverted size='huge'>Register!</Button>
                </>
              )}
              
            </Header>
            
          </Container>
      </Segment>
    </div>
  )
});
