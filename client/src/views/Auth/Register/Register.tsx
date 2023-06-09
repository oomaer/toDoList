

import { useState } from "react"
import InputWithLabel from "../../../components/Inputs/InputWithLabel/InputWithLabel"
import AppLayout from "../../../layouts/AppLayout"
import { useAuth } from "../../../context/UserContext/UserContextProvider"
import { REGISTER_USER } from "../../../api/api"
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton"
import { Link, useNavigate } from "react-router-dom"
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent"



const Register = () => {

    const {setUser, setIsAuthenticated} = useAuth();

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    //checks is all inputs are valid
    const isInputValid = () => {
        if(name === ""){
            setErrorMessage("Please enter your name")
            return false
        }
        if(name.length < 3){
            setErrorMessage("Name must be at least 3 characters long")
            return false
        }
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
        if(password.length < 6){
            setErrorMessage("Password must be at least 6 characters long")
            return false
        }
        return true
    }

    //method called when register button is clicked
    const handleRegister = async () => {
        if(!isInputValid()) return
        try{
            setLoading(true)
            const res = await REGISTER_USER(name, email, password);
            if(res.data){
                setLoading(false)
                setUser(res.data.user)
                setIsAuthenticated(true)
                localStorage.setItem("todoapp_token", res.data.jwt)
                navigate("/")
            }
            setLoading(false)
        }
        catch(err:any){
            setLoading(false)
            console.log(err.message)
            setErrorMessage(err.message)
        }
    }

    return(
        <AppLayout>
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-[450px] flex flex-col bg-white p-8 lg:p-12 rounded-[10px] shadow-3">
                    
                    <h1 className="text-3xl sm:text-4xl mb-8">
                        <span className="text-primary-500">S</span>ign Up
                    </h1>
                    <div className="mb-8">
                        <div className="mb-4">
                            <InputWithLabel 
                                id="name-input"
                                label="Name"
                                value={name}
                                onChange={(e) => {
                                    setErrorMessage("")
                                    setName(e.target.value)
                                }}
                                placeholder="Sample Name"
                            />
                        </div>

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
                                type="email"
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
                                type="password"
                            />
                        </div>

                        <div className={`${errorMessage ? 'max-h-[100px]': 'max-h-[0px]'} transition-all duration-300 ease-in-out`}>
                            {errorMessage && <p data-testid="error-message" className="text-center text-sm text-red-500">{errorMessage}</p>}
                        </div>

                    </div>

                    <div className="flex justify-center mb-4 h-[40px]">
                        {loading ? (
                            <LoadingComponent size="40" />
                        ): (
                            <PrimaryButton onClick={handleRegister}>
                                Sign Up
                            </PrimaryButton>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <p className="text-sm text-gray-500">Already Have an Account? <Link to="/login" className="text-primary-400 font-[500] cursor-pointer">Login</Link></p>
                    </div>

                </div>
            </div>
        </AppLayout>
    )
}

export default Register



const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};