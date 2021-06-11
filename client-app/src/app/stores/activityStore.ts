import { Activity } from './../models/activity';
import { makeAutoObservable, runInAction} from "mobx";
import agent from '../api/agent';
import { v4 as uuid} from 'uuid';

class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined=undefined;
    editMode=false;
    loading = false;
    loadingInit=true;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b)=>Date.parse(a.date) - Date.parse(b.date));
    }

    setLoading=(state: boolean)=>{
        this.loadingInit=state;
    }

    loadingActivities=async()=>{
        const response = await agent.Activities.list();        
        response.forEach((ac: Activity) => {
                ac.date=ac.date.split('T')[0];
                this.activityRegistry.set(ac.id, ac);
            });
         this.setLoading(false); 
    }

    selectActivity= (id: string)=>{
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity=()=>{
        this.selectedActivity=undefined;
    }

    openForm=(id?: string)=>{
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode=true;
    }

    closeForm=()=>{
        this.editMode=false;
    }

    createActivity=async (activity: Activity)=>{
        this.loading=true;
        activity.id=uuid();
        await agent.Activities.add(activity);
        runInAction(()=> {
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity=activity;
            this.editMode=false;
            this.loading=false;
        });
        
    }

    updateActivity=async (activity: Activity)=>{
        this.loading=true;
        // const acToUpdate = this.activities.find(x=>x.id === activity.id)
           await agent.Activities.update(activity);
           this.activityRegistry.set(activity.id, activity);
           this.selectedActivity=activity;
            this.editMode=false;
            this.loading=false;       
    }

    removeActivity=async(id: string)=>{        
        this.loading=true;
        await agent.Activities.remove(id);
        runInAction(()=> {
            this.activityRegistry.delete(id);
            if(this.selectedActivity?.id === id) {
                this.cancelSelectedActivity();
            }
            this.loading=false;
        });
    }
}

export default ActivityStore;


