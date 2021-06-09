import React, { ChangeEvent, useState } from "react"
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
interface Props {
    activity: Activity | undefined;
    closeForm: ()=>void;
    createOrEdit: (activity: Activity)=>void;
    submitting: boolean;
}
const ActivityForm = (props: Props) => {
    const initailState = props.activity ?? {
        id:'',
        title:'',
        description:'',
        date:'',
        category:'',
        city:'',
        venue:''
    }

    const [activity, setActivity]=useState(initailState);
    
    const handleSubmit=()=>{
        props.createOrEdit(activity);
        console.log(activity);
    }

const handleChangeInput=(e: ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target;
    setActivity({...activity,[name]:value})
}

  return (
    <Segment clearing  style={{marginTop: '70px'}}>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='title' value={activity.title} name='title' onChange={handleChangeInput}/>
            <Form.Input placeholder='description' value={activity.description} name='description' onChange={handleChangeInput}/>
            <Form.Input placeholder='category' value={activity.category} name='category' onChange={handleChangeInput}/>
            <Form.Input placeholder='date' type='date' value={activity.date} name='date' onChange={handleChangeInput}/>
            <Form.Input placeholder='city' value={activity.city} name='city' onChange={handleChangeInput}/>
            <Form.Input placeholder='venue' value={activity.venue} name='venue' onChange={handleChangeInput}/> 
            <Button  loading={props.submitting} floated='right' positive type='submit' content='Submit'/>
            <Button floated='right' type='button' content='Cancel' onClick={props.closeForm}/>
        </Form>      
    </Segment>
  )
};

export default ActivityForm;
