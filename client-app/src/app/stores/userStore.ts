import { UserFormValues } from './../models/user';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import {User} from '../models/user';
import { history } from '../..';

export default class UserStore {
 user: User | null = null;
    constructor() {
        makeAutoObservable(this);
        
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login=async (creds: UserFormValues) => {
        try{
            const responseUser = await agent.Account.login(creds);
            if(responseUser.token) {
                window.localStorage.setItem('jwt', responseUser.token);
            }           
            this.user = responseUser;
            history.push('/activities');
        }
        catch(error) {
            throw error;
        }
    }

    logout=()=>{
        window.localStorage.removeItem('jwt');
        this.user=null;
        history.push('/');
    }
}