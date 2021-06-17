import React from "react"
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const ActivityFilter = (props: any) => {
  return (
      <>
        <Menu vertical size='large' style={{width: '100%', marginTop: '95px'}}>
            <Header icon='filter' attached color='teal' content='filters'/>
            <Menu.Item content='All acivities'/>
            <Menu.Item content='Im going'/>
            <Menu.Item content="I'm hosting"/>
        </Menu>
        <Header/>    
        <Calendar/>
      </>
    
  )
};

export default ActivityFilter;
