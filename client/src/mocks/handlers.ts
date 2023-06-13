import {rest} from 'msw';
import { MOCK_GET_USER, MOCK_LOGIN_USER } from './mockresponses';
import { SERVER_URL } from '../utils/config';

/*
    This file contains all the handlers for the mock server.
    Mock server is used to mock the API calls to the server during testing.
*/

export const handlers = [
    
    // Handles a Authenticate User Request
    rest.get(SERVER_URL + `/user/authenticate`, MOCK_GET_USER),
    rest.post(SERVER_URL + `/user/login`, MOCK_LOGIN_USER),
    rest.post(SERVER_URL + `/user/register`, MOCK_LOGIN_USER),

]