
import {ReactNode, useContext, useEffect, useRef, useState } from "react";
import UserContext from "./UserContext";
import { GET_USER } from "../../api/api";


const UserContextProvider = ({children}:{children:ReactNode}) => {

    const [user, setUser] = useState<any | null>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const isRunned = useRef<boolean>(false);
    
    const authenticateToken = async () => {
        try{
            const response = await GET_USER();
            if(response.data.success){
                setUser(response.data.user);
                setIsAuthenticated(true);
                return;
            }
            setUser(null);
            setIsAuthenticated(false);
        }
        catch(error){
            console.log(error);
            setUser(null);
            setIsAuthenticated(false);
        }
    }

    
    useEffect(() => {
        if(!isRunned.current){
            isRunned.current = true;
            authenticateToken();
        }
        return () => {
            isRunned.current = true;
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


export const useAuth = () => {
    return useContext(UserContext);
}