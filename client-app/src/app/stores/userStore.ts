import { UserFormValues } from './../models/user';
import { makeAutoObservable, reaction } from 'mobx';
import agent from '../api/agent';
import {User} from '../models/user';
import { history } from '../..';
import { store } from './store';

export default class UserStore {
 user: User | null = null;
 token: string | null = window.localStorage.getItem('jwt');

    constructor() {
        makeAutoObservable(this);
        reaction(()=>this.token, token=> {
            if(token) {
                window.localStorage.getItem('jwt');
            } else {
                window.localStorage.removeItem('jwt');
            }
        })
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
            store.modalStore.closeModal();
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

    getUser= async () =>{
        const user = await agent.Account.current();
        this.user=user;
    }

    register= async(creds: UserFormValues)=> {
        try{
            const responseUser = await agent.Account.register(creds);
            if(responseUser.token) {
                window.localStorage.setItem('jwt', responseUser.token);
            }           
            this.user = responseUser;
            history.push('/activities');
            store.modalStore.closeModal();
        }
        catch(error) {
            throw error;
        }
    }
}