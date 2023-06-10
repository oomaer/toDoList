
import { createContext } from "react";
import { User } from "../../types/user.type";

interface UserContextInterface{
    user: User | null,
    isAuthenticated: boolean | null;
    setUser: (user:any) => void;
    setIsAuthenticated: (isAuthenticated:boolean) => void;
    authenticateToken: () => void;
}

const UserContext = createContext<UserContextInterface>({
    user: {
        _id: '',
        name: '',
        email:  '',
    },
    isAuthenticated: null,
    setUser: () => {},
    setIsAuthenticated: () => {},
    authenticateToken: () => {},
});

export default UserContext;
