import axios from "axios";


const serverApi = axios.create({
    baseURL: "http://localhost:5000",
});


/*
    This is a helper function to make a post request to the backend server.
    It automatically handles the token in the local storage.
    It also handles the error response from the server.
*/
export const poster = async (url:string, data?:any) => {
    let jwt = localStorage.getItem('todoapp_token') || '';
    try{
        return await serverApi.post(url, data, {headers: {
            'Authorization': `Bearer ${jwt}`
        }})
    }
    catch(err:any){
        if(err.response){
            if(!err.response.data.success){
                err.message = err.response.data.message
            }
        }
        throw err;
    }
}

/*
    This is a helper function to make a get request to the backend server.
    It automatically handles the token in the local storage.
    It also handles the error response from the server.
*/
export const fetcher = async (url:string) => {
    let jwt = localStorage.getItem('todoapp_token') || '';
    try{
        return await serverApi.get(url, {headers: {
            'Authorization': `Bearer ${jwt}`,
            "Access-Control-Allow-Origin": "*"
        }})
    }
    catch(err:any){
        if(err.response){
            if(!err.response.data.success){
                err.message = err.response.data.message
            }
        }
        throw err;
    }
}

/*
    This is a helper function to make a put request to the backend server.
    It automatically handles the token in the local storage. Sends token to server in the header.
    It also handles the error response from the server.
*/
export const put = async (url:string, data?:any) => {
    let jwt = localStorage.getItem('todoapp_token') || '';
    try{
        return await serverApi.put(url, data, {headers: {
            'Authorization': `Bearer ${jwt}`
        }})
    }
    catch(err:any){
        if(err.response){
            if(!err.response.data.success){
                err.message = err.response.data.message
            }
        }
        throw err;
    }

}

