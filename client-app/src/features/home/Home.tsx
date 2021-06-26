import React from "react"
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

const Home = (props: any) => {
  return (
    <div>
      <Segment  inverted textAlign='center' vertical className='masthead'>
          <Container>
            <Header as='h1'inverted>
              <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
              Reactivities
              <Header  inverted content='Welcome to Reactivities'/>
              <Button as={Link} to='activities' inverted size='huge'>Take me to Reactivities</Button>
            </Header>
          </Container>
      </Segment>
    </div>
  )
};

export default Home;
