
import {fetcher, poster} from './ApiHelpers';

export const GET_USER = () => {
    return fetcher('/user/authenticate')
}


export const LOGIN_USER = (username:string, password:string) => {
    return poster('/user/login', {username, password})
}