import React from "react"
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActitityList";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivityFn: (id: string)=> void;
    cancelSelectActivity:()=>void;
}

const ActivityDashboard = (props: Props) => {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList activities={props.activities} mySelectedActivity={props.selectActivityFn}/>
      </Grid.Column>
      <Grid.Column width='6'>
          {props.selectedActivity && <ActivityDetails activity={props.selectedActivity} cancelSelectedActivity={props.cancelSelectActivity}/>}
          <ActivityForm/>
      </Grid.Column>
      
    </Grid>
  )
};

export default ActivityDashboard;
