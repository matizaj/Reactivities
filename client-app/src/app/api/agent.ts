import { Activity } from './../models/activity';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';

const sleep=(delay: number)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(resolve, delay);
    });
}

const responseBody= <T> (response: AxiosResponse)=>response.data;

axios.defaults.baseURL='http://localhost:5000/api/activities';

axios.interceptors.response.use(resp=>{
    return sleep(2000).then(()=>{
        return resp;
    }).catch(err=>{
        console.log(err, 'error from sleep()');
        return Promise.reject(err);
    });
}, (error: AxiosError)=> {
    const {data, status} = error.response!;
    switch(status){
        case 400:
            if(data.errors){
                const modalStateError=[];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateError.push(data.error[key])
                    }
                }
                throw modalStateError.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            toast.error('not found');
            history.push('/not-found');
            break;
        case 500:
            toast.error('server error');
            break;
    }
    return Promise.reject(error);
})

const request= {
    get: <T> (url: string)=>axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {})=>axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {})=>axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string)=>axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: ()=>request.get<Activity[]>(''),
    detail:  (id: string)=>request.get<Activity>(`/${id}`),
    add: (body: Activity)=>request.post<Activity>('', body),
    update: (body: Activity)=>request.put<Activity>(`/${body.id}`, body),
    remove:  (id: string)=>request.delete<Activity>(`/${id}`)}

const agent = {
    Activities
}

export default agent;