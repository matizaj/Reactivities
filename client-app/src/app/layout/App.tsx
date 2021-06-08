import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiDashboard';

function App() {
  const [activities, setActivities]=useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response=> {
      console.log(response);
      setActivities(response.data);
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
  return (
    <Fragment>
      <Navbar/>
      <Container>
        <ActivityDashboard activities={activities} 
          selectedActivity={selectedActivity}
          selectActivityFn={handledSelectActivity} 
          cancelSelectActivity={handleCancelSelectedActivity}/>
      </Container>
      
    </Fragment>
  );
}

export default App;
