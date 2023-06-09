import {rest} from 'msw';
import { MOCK_GET_USER } from './mockresponses';


const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

export const handlers = [
    
    // Handles a Authenticate User Request
    rest.get(SERVER_URL + `/user/authenticate`, MOCK_GET_USER)

]