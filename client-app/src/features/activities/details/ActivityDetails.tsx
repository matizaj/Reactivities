import React from "react"
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";

interface Props {
}

const ActivityDetails = (props: Props) => {

  const {activityStore}=useStore();
  if(!activityStore.selectedActivity) return <LoadingComponents/>; 
  return (
    <Card fluid  style={{marginTop: '90px', position: 'sticky', top: '100px'}}>
    <Image src={`/assets/categoryImages/${activityStore.selectedActivity.category}.jpg`}/>
    <Card.Content>
      <Card.Header>{activityStore.selectedActivity.title}</Card.Header>
      <Card.Meta>
        <span>{activityStore.selectedActivity.date}</span>
      </Card.Meta>
      <Card.Description>
        {activityStore.selectedActivity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
     <Button.Group widths='3'>
         <Button basic color='blue' content='Edit'onClick={()=>activityStore.openForm(activityStore.selectedActivity?.id)}/>
         <Button basic color='grey' content='Cancel' onClick={activityStore.cancelSelectedActivity}/>
     </Button.Group>
    </Card.Content>
  </Card>
  )
};

export default ActivityDetails;
