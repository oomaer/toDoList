import { useState } from "react"
import InputWithLabel from "../../../components/Inputs/InputWithLabel/InputWithLabel"
import AppLayout from "../../../layouts/AppLayout"
import { useAuth } from "../../../context/UserContext/UserContextProvider"
import { LOGIN_USER } from "../../../api/api"
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton"



const Login = () => {

    const {setUser} = useAuth();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleLogin = async () => {
        try{
            const res = await LOGIN_USER(email, password);
            if(res.data){
                setUser(res.data)
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
                        <span className="text-[#7DA99F]">L</span>ogin
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
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className={`${errorMessage ? 'max-h-[100px]': 'max-h-[0px]'} transition-all duration-300 ease-in-out`}>
                            {errorMessage && <p data-testid="error-message" className="text-center text-sm text-red-500">{errorMessage}</p>}
                        </div>

                    </div>

                    <div className="flex justify-center">
                        <PrimaryButton onClick={handleLogin}>
                            Login
                        </PrimaryButton>
                    </div>


                </div>
            </div>
        </AppLayout>
    )
}

export default Login