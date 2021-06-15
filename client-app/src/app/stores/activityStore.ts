import { Activity } from './../models/activity';
import { makeAutoObservable, runInAction} from "mobx";
import agent from '../api/agent';

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

    get groupOfActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity)=>{
            const date=activity.date;
            activities[date]=activities[date]?[...activities[date], activity]: [activity];
            return activities;
        }, {} as {[key: string]: Activity[]}))
    }

    setLoading=(state: boolean)=>{
        this.loadingInit=state;
    }

    loadingActivities=async()=>{
        const response = await agent.Activities.list();        
        response.forEach((ac: Activity) => {
               this.setActivity(ac);
            });
         this.setLoading(false); 
    }

    loadActivity=async (id: string)=>{
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity=activity;
            return activity;
        } else {
            this.loadingInit=true;
            const response=await agent.Activities.detail(id);
            this.setActivity(response);
            this.selectedActivity=response;
            this.loadingInit=false;
            return activity;
        }

    }

    private getActivity=(id: string)=>{
        return this.activityRegistry.get(id);
    }

    private setActivity=(activity: Activity)=>{
        activity.date=activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    // selectActivity= (id: string)=>{
    //     this.selectedActivity = this.activityRegistry.get(id);
    // }

    // cancelSelectedActivity=()=>{
    //     this.selectedActivity=undefined;
    // }

    // openForm=(id?: string)=>{
    //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode=true;
    // }

    // closeForm=()=>{
    //     this.editMode=false;
    // }

    createActivity=async (activity: Activity)=>{
        this.loading=true;
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
                this.selectedActivity=undefined;
            }
            this.loading=false;
        });
    }
}

export default ActivityStore;


