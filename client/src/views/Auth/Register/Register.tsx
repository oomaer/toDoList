

import { useState } from "react"
import InputWithLabel from "../../../components/Inputs/InputWithLabel/InputWithLabel"
import AppLayout from "../../../layouts/AppLayout"
import { useAuth } from "../../../context/UserContext/UserContextProvider"
import { REGISTER_USER } from "../../../api/api"
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton"
import { Link, useNavigate } from "react-router-dom"



const Register = () => {

    const {setUser} = useAuth();

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const navigate = useNavigate();

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

    const handleRegister = async () => {
        if(!isInputValid()) return
        try{
            const res = await REGISTER_USER(name, email, password);
            if(res.data){
                setUser(res.data.user)
                localStorage.setItem("todoapp_token", res.data.jwt)
                navigate("/")
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
                        <span className="text-blue-500">S</span>ign Up
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
                        <PrimaryButton onClick={handleRegister}>
                            Sign Up
                        </PrimaryButton>
                    </div>

                    <div className="flex justify-end">
                        <p className="text-sm text-gray-500">Already Have an Account? <Link to="/login" className="text-blue-500 font-[500] cursor-pointer">Login</Link></p>
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