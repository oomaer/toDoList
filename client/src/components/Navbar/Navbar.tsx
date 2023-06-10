import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext/UserContextProvider";


const Navbar = () => {

    const {isAuthenticated, setUser, setIsAuthenticated} = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('todoapp_token');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    }

    return (
        <nav className="w-full px-[5vw] md:px-6 py-3 bg-white bg-opacity-50">
            <div className="flex items-center justify-between">
                <Link to = "/">To Do List App</Link>
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