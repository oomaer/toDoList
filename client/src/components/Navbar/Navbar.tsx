import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext/UserContextProvider";
import {FiLogIn, FiLogOut} from 'react-icons/fi';

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
        <nav className="w-full px-[5vw] md:px-6 py-3 bg-white bg-opacity-20">
            <div className="flex items-center justify-between">
                <Link to = "/" className="logo-font text-primary-500">To Do List App</Link>
                <div className="flex">
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>
                            <FiLogOut size={20} />
                        </button>
                    ): (
                        <Link to="/login">
                            <FiLogIn size={20} />
                        </Link>
                    )}
                    
                </div>
            </div>
        </nav>
    );
}

export default Navbar;