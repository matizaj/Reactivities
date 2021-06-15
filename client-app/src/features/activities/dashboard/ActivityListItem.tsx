import { observer } from "mobx-react-lite";
import React, { useState } from "react"
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
    activity: Activity;
}

export default observer(function ActivityListItem(props: Props){
    const [target, setTarget]=useState('');
    const {activityStore} = useStore();

    const handleActivityDelete=(e: any, id: string)=>{
        setTarget(e.currentTarget.name);
        activityStore.removeActivity(id);
    }
    console.log(activityStore.selectedActivity);
  return (   
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image sizy='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${props.activity.id}`}>
                                {props.activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {props.activity.date}
                    <Icon name='marker'/> {props.activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here!
            </Segment>
            <Segment clearing>
                <span>
                    {props.activity.description}
                </span>
                <Button as={Link} to={`/activities/${props.activity.id}`} color='teal' floated='right' content='View'/>
            </Segment>
        </Segment.Group>
    );
       
});
