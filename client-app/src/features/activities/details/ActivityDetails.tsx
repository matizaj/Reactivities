import React from "react"
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity;
    cancelSelectedActivity:()=>void;
    openForm: (id?: string | undefined) => void;
}

const ActivityDetails = (props: Props) => {
  return (
    <Card fluid  style={{marginTop: '90px'}}>
    <Image src={`/assets/categoryImages/${props.activity.category}.jpg`}/>
    <Card.Content>
      <Card.Header>{props.activity.title}</Card.Header>
      <Card.Meta>
        <span>{props.activity.date}</span>
      </Card.Meta>
      <Card.Description>
        {props.activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
     <Button.Group widths='3'>
         <Button basic color='blue' content='Edit'onClick={()=>props.openForm(props.activity.id)}/>
         <Button basic color='grey' content='Cancel' onClick={props.cancelSelectedActivity}/>
     </Button.Group>
    </Card.Content>
  </Card>
  )
};

export default ActivityDetails;
