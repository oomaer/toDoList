
import {fetcher} from './ApiHelpers';

export const GET_USER = () => {
    return fetcher('/user')
}