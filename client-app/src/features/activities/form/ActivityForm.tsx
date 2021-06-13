import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react"
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid} from 'uuid';

export default observer(function ActivityForm(){
    const {activityStore} = useStore();
    const history = useHistory();
    const urlParam = useParams<{id:string}>();
    const [activity, setActivity]=useState({
        id:'',
        title:'',
        description:'',
        date:'',
        category:'',
        city:'',
        venue:''
    });
    
    useEffect(()=>{
        console.log(urlParam);
        if(urlParam.id) activityStore.loadActivity(urlParam.id).then(resp=> setActivity(resp!));
      },[urlParam, activityStore]);
   
    const handleSubmit=()=>{
        if(activity.id.length===0){
            let newActivity={...activity, id: uuid()};
            activityStore.createActivity(newActivity).then(()=>{
            history.push(`/activities/${newActivity.id}`)
            })
        } else {
            activityStore.updateActivity(activity).then(()=>{
                history.push(`/activities/${activity.id}`)
                })
        }
    }

    const handleChangeInput=(e: ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=e.target;
        setActivity({...activity,[name]:value})
    }

    if(activityStore.loadingInit) return <LoadingComponents/>; 
  return (
    <Segment clearing  style={{marginTop: '90px', position: 'sticky', top: '100px'}}>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='title' value={activity?.title} name='title' onChange={handleChangeInput}/>
            <Form.Input placeholder='description' value={activity?.description} name='description' onChange={handleChangeInput}/>
            <Form.Input placeholder='category' value={activity?.category} name='category' onChange={handleChangeInput}/>
            <Form.Input placeholder='date' type='date' value={activity?.date} name='date' onChange={handleChangeInput}/>
            <Form.Input placeholder='city' value={activity?.city} name='city' onChange={handleChangeInput}/>
            <Form.Input placeholder='venue' value={activity?.venue} name='venue' onChange={handleChangeInput}/> 
            <Button loading={activityStore.loading} floated='right' positive type='submit' content='Submit'/>
            <Button floated='right' type='button' content='Cancel' as={Link} to='/activities'/>
        </Form>      
    </Segment>
  )
});
