import { observer } from "mobx-react-lite";
import React from "react"
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActitityList";


export default observer(function ActivityDashboard()  {
  const {activityStore} = useStore();
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList/>
      </Grid.Column>
      <Grid.Column width='6'>
          {activityStore.selectedActivity && !activityStore.editMode &&
          <ActivityDetails />}
          {activityStore.editMode ?  <ActivityForm/> : null}
      </Grid.Column>
      
    </Grid>
  )
});