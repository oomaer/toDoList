import { useAuth } from "../../context/UserContext/UserContextProvider";


const Navbar = () => {

    const {user, setUser, setIsAuthenticated} = useAuth();

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
                    <button onClick={handleLogout}>
                        logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;