import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';

function App() {
  const [activities, setActivities]=useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode]=useState(false);
  const [loading, setLoading]=useState(true);
  const [submitting, setSubmitting]=useState(false);

  useEffect(()=>{
   agent.Activities.list().then(response=> {
      // console.log(response);
      response.forEach((ac: Activity) => {ac.date=ac.date.split('T')[0]});
      console.log(response);
      setActivities(response);
      setLoading(false);
    })
  }, []);

  // const activitiesToRender=activities.map((activity: Activity)=>{
  //   return (
  //       <li key={activity.id}>{activity.title}</li>
  //   );
  // });
  const handledSelectActivity=(id: string)=>{
    const selected = activities.find(activity=>activity.id === id);
    setSelectedActivity(selected);
  }
  const handleCancelSelectedActivity=()=>{
    setSelectedActivity(undefined);
  }
  const handleFormOpen=(id?: string)=>{
    id ? handledSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleFormClose=()=>{
    setEditMode(false);
  }

  const handleDeleteActivity=(id: string)=>{
    setSubmitting(true);
    agent.Activities.remove(id).then(()=>{
      const newActivity = activities.filter(ac=>ac.id !== id);
      setActivities(newActivity);
      setEditMode(false);
      setSubmitting(false);
    });

  }

  const handleCreateOrEditActivity=(activity: Activity)=>{
    //if id exist we updat eactivity
    setSubmitting(true);
    if(activity.id) {
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(ac=>ac.id !== activity.id), activity]);
      });     
    }
    // create activity 
    else {
      activity.id= uuid();
      console.log(activity);
      agent.Activities.add(activity).then(()=>{
        setActivities([...activities, activity]);
      });      
    }
    setEditMode(false);
    setSelectedActivity(activity);
    setSubmitting(false);
  }
  if(loading) return <LoadingComponents/>
  return (
    <Fragment>
      <Navbar createActivity={handleFormOpen}/>
      <Container>
        <ActivityDashboard activities={activities} 
          selectedActivity={selectedActivity}
          selectActivityFn={handledSelectActivity} 
          cancelSelectActivity={handleCancelSelectedActivity}
          turnEditMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrUpdate={handleCreateOrEditActivity}
          removeActivity={handleDeleteActivity}
          submitting={submitting}/>
      </Container>
      
    </Fragment>
  );
}

export default App;
