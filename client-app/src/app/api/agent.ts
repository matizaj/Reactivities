import { Activity } from './../models/activity';
import axios, { AxiosResponse } from 'axios';

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