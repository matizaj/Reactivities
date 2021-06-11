import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore}=useStore();
  

  useEffect(()=>{
  activityStore.loadingActivities();
  }, [activityStore]);
  
  if(activityStore.loadingInit) return <LoadingComponents/>
  return (
    <div>    
      <Navbar />
      <Container>
        <ActivityDashboard/>
      </Container>
      
    </div>
  );
}

export default observer(App);
