import React from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from '../../features/home/Home';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/error/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/error/NotFound';

function App() {
  const location = useLocation();
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <Route exact path='/' component={Home}/>    
      <Route
        path={'/(.+)'}
        render={()=>(
          <>
            <Navbar />
            <Container>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard}/>
                <Route path='/activities/:id' component={ActivityDetails}/>
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
                <Route path='/errors' component={TestErrors}/>
                <Route path='/not-found' component={NotFound}/>
              </Switch>
              
            </Container>
          </>
        )}
      />
      
    </>
  );
}

export default observer(App);
