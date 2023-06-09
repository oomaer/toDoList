

interface InputWithLabelProps {
    id: string
    label: string
    value: string
    setValue: (value: string) => void
    placeholder?: string
}

const InputWithLabel = ({value, setValue, placeholder, id, label}: InputWithLabelProps) => {
    
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    
    return(
        <div className="flex flex-col">
            <label className="mb-4" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            >
            </input>
        </div>
    )
}

export default InputWithLabel