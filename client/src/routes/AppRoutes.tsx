import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import TodoView from "../views/TodoView/TodoView"


const AppRoutes = () => {

    return(
        <Router>
            <Routes>
                <Route path="/" element={<TodoView />} />
            </Routes>
        </Router>
    )

}

export default AppRoutes