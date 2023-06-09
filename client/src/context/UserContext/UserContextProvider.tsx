
import {ReactNode, useContext, useEffect, useRef, useState } from "react";
import UserContext from "./UserContext";
import { GET_USER } from "../../api/api";
import { User } from "../../types/user.type";


const UserContextProvider = ({children}:{children:ReactNode}) => {

    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [userLoading, setUserLoading] = useState<boolean>(true);

    const isRunned = useRef<boolean>(false);
    
    //this method will authenticate the token stored in local storage
    //Gets the user data from the server with the help of token and sets the user and isAuthenticated state
    const authenticateToken = async () => {
        setUserLoading(true);
        try{
            const response = await GET_USER();
            if(response.data.success){
                setUser(response.data.user);
                setIsAuthenticated(true);
                setUserLoading(false);
                return;
            }
            setUserLoading(false);
            setUser(null);
            setIsAuthenticated(false);
        }
        catch(error){
            console.log(error);
            setUserLoading(false);
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
            userLoading,
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