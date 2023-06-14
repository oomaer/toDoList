


import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext/UserContextProvider";
import LoadingView from "../views/Loading/LoadingView";


export type ProtectedRouteProps = {
    authenticationPath: string;
    children: JSX.Element;
  };
  
export default function ProtectedRoute({authenticationPath, children}: ProtectedRouteProps) {

    const {isAuthenticated, userLoading} = useAuth()
    
    if(userLoading)   return <LoadingView />;

    if(isAuthenticated) {
        return children;
    } else {
        return <Navigate to={{ pathname: authenticationPath }} />;
    }
}