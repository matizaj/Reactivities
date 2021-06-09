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
    turnEditMode: boolean;
    openForm: (id?: string | undefined) => void;
    closeForm: ()=>void;
    createOrUpdate: (activity: Activity)=>void;
    removeActivity: (id: string)=> void;
    submitting: boolean;
}

const ActivityDashboard = (props: Props) => {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList activities={props.activities} mySelectedActivity={props.selectActivityFn} removeActivity={props.removeActivity} submitting={props.submitting}/>
      </Grid.Column>
      <Grid.Column width='6'>
          {props.selectedActivity && !props.turnEditMode &&
          <ActivityDetails 
          activity={props.selectedActivity} 
          cancelSelectedActivity={props.cancelSelectActivity}
        //   openForm={()=>props.openForm(props.selectedActivity?.id)}
          openForm={props.openForm}
          />}
          {props.turnEditMode ?  <ActivityForm closeForm={props.closeForm} activity={props.selectedActivity} createOrEdit={props.createOrUpdate} submitting={props.submitting}/> : null}
      </Grid.Column>
      
    </Grid>
  )
};

export default ActivityDashboard;
