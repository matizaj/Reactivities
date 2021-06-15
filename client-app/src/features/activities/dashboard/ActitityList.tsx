import { observer } from "mobx-react-lite";
import React, { Fragment } from "react"
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList(){
  const {activityStore} = useStore();  
  return (
    <div style={{marginTop : '70px'}}  >
          {activityStore.groupOfActivities.map(([group, activities])=>{
            return (
            <Fragment key={group}>
              <Header sub color='teal'>
                {group}
              </Header>
                  {activities.map(a=>{
                    return (
                          <ActivityListItem key={a.id} activity={a}/>
                    );
                  })}
            </Fragment>)
      })}
    </div>
    
  )
});
