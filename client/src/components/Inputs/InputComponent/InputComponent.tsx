
interface InputComponentProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

const InputComponent = ({value, onChange, placeholder}: InputComponentProps) => {
    
    return(
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-[5px] p-2 shadow-3 bg-white bg-opacity-50"
        >    
        </input>
    )
}

export default InputComponent