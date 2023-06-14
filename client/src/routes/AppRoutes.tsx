import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import TodoView from "../views/TodoView/TodoView"
import Login from "../views/Auth/Login/Login"
import Register from "../views/Auth/Register/Register"
import ProtectedRoute from "./ProtectedRoute"


const AppRoutes = () => {

    return(
        <Router>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute authenticationPath="/login">
                        <TodoView />
                    </ProtectedRoute>
                } />
                <Route path="/" element={<TodoView />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )

}

export default AppRoutes