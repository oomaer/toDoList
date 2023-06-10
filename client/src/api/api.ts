
import {fetcher, poster, put} from './ApiHelpers';

export const GET_USER = () => {
    return fetcher('/user/authenticate')
}

export const LOGIN_USER = (email:string, password:string) => {
    return poster('/user/login', {email, password})
}

export const REGISTER_USER = (name:string, email:string, password:string) => {
    return poster('/user/register', {name, email, password})
}

export const CREATE_TODO = (description:string, userId: string) => {
    return poster('/todo/create', {description, userId})
}

export const GET_TODOS = (userId: string) => {
    return fetcher(`/todo/get/${userId}`)
}


export const UPDATE_TODO = (todoId: string, completed: boolean) => {
    return put(`/todo/changecompletestatus/${todoId}`, {completed})
}

export const DELETE_TODO = (todoId: string) => {
    return put(`/todo/delete/${todoId}`)
}