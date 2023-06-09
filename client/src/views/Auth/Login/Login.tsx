import { useState } from "react"
import InputWithLabel from "../../../components/Inputs/InputWithLabel/InputWithLabel"
import AppLayout from "../../../layouts/AppLayout"
import { useAuth } from "../../../context/UserContext/UserContextProvider"
import { LOGIN_USER } from "../../../api/api"
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton"
import { Link, useNavigate } from "react-router-dom"



const Login = () => {

    const {setUser, setIsAuthenticated} = useAuth();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const navigate = useNavigate();

    const isInputValid = () => {
        if(email === ""){
            setErrorMessage("Please enter your email")
            return false
        }
        if(!validateEmail(email)){
            setErrorMessage("Please enter a valid email")
            return false
        }
        if(password === ""){
            setErrorMessage("Please enter your password")
            return false
        }
        return true
    }

    const handleLogin = async () => {
        if(!isInputValid()) return
        try{
            const res = await LOGIN_USER(email, password);
            if(res.data){
                setUser(res.data.user)
                setIsAuthenticated(true)
                localStorage.setItem("todoapp_token", res.data.jwt)
                navigate('/')
            }
        }
        catch(err:any){
            console.log(err.message)
            setErrorMessage(err.message)
        }
    }

    return(
        <AppLayout>
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-[450px] flex flex-col bg-white p-8 lg:p-12 rounded-[10px] shadow-xl">
                    
                    <h1 className="text-3xl sm:text-4xl mb-8">
                        <span className="text-blue-500">L</span>ogin
                    </h1>
                    <div className="mb-8">
                        <div className="mb-4">
                            <InputWithLabel 
                                id="email-input"
                                label="Email"
                                value={email}
                                onChange={(e) => {
                                    setErrorMessage("")
                                    setEmail(e.target.value)
                                }}
                                placeholder="sampleemail@gmail.com"
                            />
                        </div>

                        <div className="mb-4">
                            <InputWithLabel 
                                id="pass-input"
                                label="Password"
                                value={password}
                                onChange={(e) => {
                                    setErrorMessage("")
                                    setPassword(e.target.value)
                                }}
                                placeholder="S@mpl3P@ssw0rd"
                            />
                        </div>

                        <div className={`${errorMessage ? 'max-h-[100px]': 'max-h-[0px]'} transition-all duration-300 ease-in-out`}>
                            {errorMessage && <p data-testid="error-message" className="text-center text-sm text-red-500">{errorMessage}</p>}
                        </div>

                    </div>

                    <div className="flex justify-center mb-4">
                        <PrimaryButton onClick={handleLogin}>
                            Login
                        </PrimaryButton>
                    </div>

                    <div className="flex justify-end">
                        <p className="text-sm text-gray-500">Don't have an account? <Link to="/register" className="text-blue-500 font-[500] cursor-pointer">Sign up</Link></p>
                    </div>


                </div>
            </div>
        </AppLayout>
    )
}

export default Login



const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};