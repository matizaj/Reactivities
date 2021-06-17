import { observer } from "mobx-react-lite";
import React, { useEffect } from "react"
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActitityList";
import ActivityFilter from "./ActivityFilter";


export default observer(function ActivityDashboard()  {
  const {activityStore} = useStore();

  useEffect(()=>{
    if(activityStore.activityRegistry.size===0) {
      activityStore.loadingActivities();
    }
  }, [activityStore]);
  
  if(activityStore.loadingInit) return <LoadingComponents/>
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList/>
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilter/>
      </Grid.Column>
      
    </Grid>
  )
});