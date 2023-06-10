import {rest} from 'msw';
import { MOCK_GET_USER, MOCK_LOGIN_USER } from './mockresponses';


const SERVER_URL = import.meta.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

export const handlers = [
    
    // Handles a Authenticate User Request
    rest.get(SERVER_URL + `/user/authenticate`, MOCK_GET_USER),
    rest.post(SERVER_URL + `/user/login`, MOCK_LOGIN_USER),
    rest.post(SERVER_URL + `/user/register`, MOCK_LOGIN_USER),

]