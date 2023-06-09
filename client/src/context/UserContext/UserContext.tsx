
import { createContext } from "react";
import { User } from "../../types/user.type";

interface UserContextInterface{
    user: User | null,
    isAuthenticated: boolean | null;
    setUser: (user:any) => void;
    setIsAuthenticated: (isAuthenticated:boolean) => void;
    authenticateToken: () => void;
    userLoading?: boolean;
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
    userLoading: false,
});

export default UserContext;
