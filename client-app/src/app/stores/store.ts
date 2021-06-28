import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import UserStore from "./userStore";

interface Store {
    activityStore: ActivityStore
    userStore: UserStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);


export function useStore() {
    return useContext(StoreContext);
}