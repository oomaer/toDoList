
import { createContext } from "react";

interface UserContextInterface{
    user: {
        email: string;
        
    },
    isAuthenticated: boolean | null;
    setUser: (user:any) => void;
    setIsAuthenticated: (isAuthenticated:boolean) => void;
    authenticateToken: () => void;
}

const UserContext = createContext<UserContextInterface>({
    user: {
        email:  '',
        
    },
    isAuthenticated: null,
    setUser: () => {},
    setIsAuthenticated: () => {},
    authenticateToken: () => {},
});

export default UserContext;
