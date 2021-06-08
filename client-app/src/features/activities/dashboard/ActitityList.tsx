import React from "react"
import { Segment, Item, Button, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activities: Activity[];
    mySelectedActivity: (id: string)=> void;
}

const ActivityList = (props: Props) => {
  return (
    <Segment  style={{marginTop : '50px'}}>
      <Item.Group divided >
        {props.activities.map(a=>{
            return (
                <Item key={a.id}>
                    <Item.Content>
                        <Item.Header as='a'>{a.title}</Item.Header>
                        <Item.Meta>{a.date}</Item.Meta>
                        <Item.Description>
                            <div>{a.description}</div>
                            <div>{a.city}, {a.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated='right' content='View' color='blue' onClick={()=>props.mySelectedActivity(a.id)}></Button>
                            <Label basic content={a.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            );
        })}
      </Item.Group>
    </Segment>
  )
};

export default ActivityList;
