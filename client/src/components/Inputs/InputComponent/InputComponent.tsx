import { useState } from "react"

interface InputComponentProps {
    value: string
    setValue: (value: string) => void
    placeholder?: string
}

const InputComponent = ({value, setValue, placeholder}: InputComponentProps) => {
    
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    
    return(
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        >
        
        </input>
    )
}

export default InputComponent