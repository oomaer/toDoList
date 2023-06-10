
import {fetcher, poster} from './ApiHelpers';

export const GET_USER = () => {
    return fetcher('/user/authenticate')
}

export const LOGIN_USER = (email:string, password:string) => {
    return poster('/user/login', {email, password})
}

export const REGISTER_USER = (name:string, email:string, password:string) => {
    return poster('/user/register', {name, email, password})
}

export const CREATE_TODO = (description:string) => {
    return poster('/todo/create', {description})
}