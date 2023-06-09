

const Navbar = () => {
    return (
        <nav className="w-full px-[5vw] md:px-6 py-6">
            <div className="flex items-center justify-between">
                <h1>To Do List App</h1>
                <div className="flex">
                    <a href="login">
                        Login
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;