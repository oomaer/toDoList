

interface InputWithLabelProps {
    id: string
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

const InputWithLabel = ({value, onChange, placeholder, id, label}: InputWithLabelProps) => {
    
    return(
        <div className="flex flex-col">
            <label className="mb-1 tracking-wide text-gray-500" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded-[5px] p-2"
            >
            </input>
        </div>
    )
}

export default InputWithLabel