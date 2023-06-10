import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext/UserContextProvider";


const Navbar = () => {

    const {isAuthenticated, setUser, setIsAuthenticated} = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('todoapp_token');
        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <nav className="w-full px-[5vw] md:px-6 py-6">
            <div className="flex items-center justify-between">
                <h1>To Do List App</h1>
                <div className="flex">
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>
                            logout
                        </button>
                    ): (
                        <Link to="/login">
                            Login
                        </Link>
                    )}
                    
                </div>
            </div>
        </nav>
    );
}

export default Navbar;