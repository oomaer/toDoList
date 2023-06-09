import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import TodoView from "../views/TodoView/TodoView"
import Login from "../views/Auth/Login/Login"


const AppRoutes = () => {

    return(
        <Router>
            <Routes>
                <Route path="/" element={<TodoView />} />
                <Route path="/login" element={<Login />} />
        
            </Routes>
        </Router>
    )

}

export default AppRoutes