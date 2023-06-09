
import {ReactNode, useEffect, useRef, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";


const UserContextProvider = ({children}:{children:ReactNode}) => {

    const [user, setUser] = useState<any | null>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const isRunned = useRef<boolean>(false);

    const authenticateToken = async () => {
        let token = localStorage.getItem('wp_token') as string;
        if(token){
            try{
                let response = await axios.get('/user/authenticate', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    setIsAuthenticated(true)
                    setUser(response.data.user);
                }
                else{
                    setIsAuthenticated(false)
                }
            }
            catch(err:any){
                setIsAuthenticated(false)
            }
        }
        else{
            setIsAuthenticated(false)
        }
    }

    
    useEffect(() => {
        if(!isRunned.current){

            isRunned.current = true;
            authenticateToken();
  
        return () => {
            isRunned.current = true;
        }

        }
    }, [])

    return (
        <UserContext.Provider
        value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            authenticateToken,
        }}
        >
        {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;