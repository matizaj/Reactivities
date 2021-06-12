import React from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import Home from '../../features/home/Home';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  return (
    <div>    
      <Navbar />
      <Container>
        <Route exact path='/' component={Home}/>
        <Route exact path='/activities' component={ActivityDashboard}/>
        <Route path='/activities/:id' component={ActivityDetails}/>
        <Route path='/createActivity' component={ActivityForm}/>
      </Container>
      
    </div>
  );
}

export default observer(App);
