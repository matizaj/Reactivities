import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/api/activities').then(response=> {
      console.log(response);
      setActivities(response.data);
    })
  }, []);

  const activitiesToRender=activities.map((activity:any)=>{
    return (
        <li key={activity.id}>{activity.title}</li>
    );
  });
  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
      <List>
        {activitiesToRender};
      </List>
      
    </div>
  );
}

export default App;
