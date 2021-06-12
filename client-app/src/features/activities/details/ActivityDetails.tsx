import { observer } from "mobx-react-lite";
import React from "react"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityDetails(){

  const {activityStore}=useStore();
  const urlParam = useParams<{id:string}>();
  useEffect(()=>{
    console.log(urlParam);
    if(urlParam.id) activityStore.loadActivity(urlParam.id);
  },[urlParam, activityStore]);
  
  if(!activityStore.selectedActivity  || activityStore.loadingInit) return <LoadingComponents/>; 
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
         <Button basic color='blue' content='Edit'/>
         <Button basic color='grey' content='Cancel' />
     </Button.Group>
    </Card.Content>
  </Card>
  )
});
