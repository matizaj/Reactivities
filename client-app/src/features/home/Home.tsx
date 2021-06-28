import { observer } from "mobx-react-lite";
import React from "react"
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function Home(){
  const {userStore} = useStore();
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
                  <Button as={Link} to='/login' inverted size='huge'>Login!</Button>
                </>
              )}
              
            </Header>
            
          </Container>
      </Segment>
    </div>
  )
});
