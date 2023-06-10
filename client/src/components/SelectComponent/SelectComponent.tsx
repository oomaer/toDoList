
import { HiOutlineMenu } from 'react-icons/hi'
import { BiChevronDown } from 'react-icons/bi'
import { useState } from 'react'

interface SelectComponentProps {
    value: {value:string, label:string}
    onChange: (e: any) => void
    items: {value: string, label: string}[]
}


const SelectComponent = ({value, onChange, items}: SelectComponentProps) => {
    
    const [showOptions, setShowOptions] = useState<boolean>(true)


    return(
        <div className="w-full relative">
            <button
                onClick={() => setShowOptions(!showOptions)} 
                className="w-full text-start flex items-center p-4 rounded-[12px] bg-[#bab29c] shadow-2xl text-[#908771]">      
                <HiOutlineMenu size={16} className="" />
                <div className='flex-grow mx-2 text-white'>
                    {value.label}
                </div>
                <BiChevronDown size={16} />
            </button>

            <div className={`w-full bg-[#bab29c] overflow-hidden text-white rounded-[12px] shadow-2xl absolute ${showOptions ? "block" : "hidden"}`}>
                {items.map((item, index) => {
                    return(
                        <button 
                            key={index}
                            className='w-full p-4 text-start hover:bg-[#908771] hover:text-white'
                        >
                            {item.label}
                        </button>
                    )
                })}

            </div>


        </div>
    )
}

export default SelectComponent