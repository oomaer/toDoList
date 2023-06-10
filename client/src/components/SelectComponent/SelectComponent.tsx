
import { HiOutlineMenu } from 'react-icons/hi'
import { BiChevronDown } from 'react-icons/bi'
import { useRef, useState } from 'react'
import useOutsideAlerter from '../hooks/useOutsideAlerter'
import {motion, AnimatePresence} from 'framer-motion'

interface SelectComponentProps {
    value: {value:string, label:string}
    setValue: (value: {value:string, label:string}) => void
    items: {value: string, label: string}[]
}


const SelectComponent = ({value, setValue, items}: SelectComponentProps) => {
    
    const [showOptions, setShowOptions] = useState<boolean>(true)

    const selectContainerRef = useRef(null);

    useOutsideAlerter(selectContainerRef, () => {
        setShowOptions(false)
    })

    const handleOptionClick = (item: {value: string, label: string}) => {
        setValue({value: item.value, label: item.label})
        setShowOptions(false)
    }

    return(
        <div className="w-full relative" ref={selectContainerRef}>
            <button
                onClick={() => setShowOptions(!showOptions)} 
                className="w-full text-start flex items-center p-4 rounded-[12px] bg-[#bab29c] shadow-2xl text-[#908771]">      
                <HiOutlineMenu size={16} className="" />
                <div className='flex-grow mx-2 text-white'>
                    {value.label}
                </div>
                <BiChevronDown size={16} />
            </button>

            <AnimatePresence>
                {showOptions &&
                <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: "auto"}}
                    exit={{opacity: 0, height: 0}} 
                    className={`w-full bg-[#bab29c] overflow-hidden text-white rounded-[12px] shadow-2xl absolute`}>

                    {items.map((item, index) => {
                        return(
                            <button 
                                key={index}
                                className='w-full p-4 text-start hover:bg-[#908771] hover:text-white'
                                onClick={() => handleOptionClick(item)}
                            >
                                {item.label}
                            </button>
                        )
                    })}
                </motion.div>
                }
            </AnimatePresence>


        </div>
    )
}

export default SelectComponent