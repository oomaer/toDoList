import { useState } from "react"


const InputComponent = () => {
    
    const [value, setValue] = useState<string>("")
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    
    return(
        <input
            value={value}
            onChange={onChange}

        >
        
        </input>
    )
}

export default InputComponent