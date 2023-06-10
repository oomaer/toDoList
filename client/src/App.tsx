import AppRoutes from "./routes/AppRoutes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  )
}

export default App
