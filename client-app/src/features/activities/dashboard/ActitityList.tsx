import { observer } from "mobx-react-lite";
import React, { useState } from "react"
import { Link, useParams } from "react-router-dom";
import { Segment, Item, Button, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

interface Props {
}

export default observer(function ActivityList(props: Props){
    const [target, setTarget]=useState('');

    const {activityStore} = useStore();
    

    const handleActivityDelete=(e: any, id: string)=>{
        setTarget(e.currentTarget.name);
        activityStore.removeActivity(id);
    }
  return (
    <Segment  style={{marginTop : '50px'}}>
      <Item.Group divided >
        {activityStore.activitiesByDate.map(a=>{
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
                            <Button floated='right' content='View' color='blue' as={Link} to={`/activities/${a.id}`}></Button>
                            <Button loading={activityStore.loading && target===a.id} name={a.id} floated='right' content='Remove' color='red' onClick={(e)=>handleActivityDelete(e, a.id)}></Button>
                            <Label basic content={a.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            );
        })}
      </Item.Group>
    </Segment>
  )
});
