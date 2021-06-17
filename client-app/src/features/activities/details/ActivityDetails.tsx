import { observer } from "mobx-react-lite";
import React from "react"
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid, GridColumn, Image } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import ActivityDetailChat from "../dashboard/ActivityDetailChat";
import ActivityDetailHeader from "../dashboard/ActivityDetailHeader";
import ActivityDetailInfo from "../dashboard/ActivityDetailInfo";
import ActivityDetailSidebar from "../dashboard/ActivityDetailSidebar";

export default observer(function ActivityDetails(){

  const {activityStore}=useStore();
  const urlParam = useParams<{id:string}>();
  useEffect(()=>{
    console.log(urlParam);
    if(urlParam.id) activityStore.loadActivity(urlParam.id);
  },[urlParam, activityStore]);

  if(!activityStore.selectedActivity  || activityStore.loadingInit) return <LoadingComponents/>; 
  return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailHeader activity={activityStore.selectedActivity}/>
          <ActivityDetailInfo activity={activityStore.selectedActivity}/>
          <ActivityDetailChat/>
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailSidebar/>
        </Grid.Column>
      </Grid>
  )
});
