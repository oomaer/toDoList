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
            <div>

                <div>
                    <InputWithLabel 
                        id="email-input"
                        label="Email"
                        value={email}
                        setValue={setEmail}
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <InputWithLabel 
                        id="pass-input"
                        label="Password"
                        value={password}
                        setValue={setPassword}
                        placeholder="Enter your password"
                    />
                </div>

                <div>
                    {errorMessage && <p data-testid="error-message" className="text-red-500">{errorMessage}</p>}
                </div>

                <div>
                    <PrimaryButton onClick={handleLogin}>
                        Login
                    </PrimaryButton>
                </div>


            </div>
        </AppLayout>
    )
}

export default Login