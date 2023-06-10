
interface InputComponentProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    onEnter?: () => void
    type?: string
}

const InputComponent = ({value, onChange, placeholder, onEnter, type}: InputComponentProps) => {
    
    return(
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-[5px] p-2 shadow-3 bg-white bg-opacity-50"
            type={type? type : "text"}
            onKeyDown={(e) => {
                if(onEnter){
                    if(e.key === "Enter"){
                        onEnter()
                    }
                }
            }}
        >    
        </input>
    )
}

export default InputComponent