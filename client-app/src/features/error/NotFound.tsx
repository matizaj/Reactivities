import React from "react"
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Segment style={{marginTop: 70, textAlign: 'center'}}>
      <Header icon >
        <Icon name='search'/>
        Ooops - we've looked everywhere and could not find this..
      </Header>
      <Segment.Inline>
          <Button content='Back' as={Link} to='/activities' primary/>
      </Segment.Inline>
    </Segment>
  )
};

export default NotFound;
