
import { HiOutlineMenu } from 'react-icons/hi'
import { BiChevronDown } from 'react-icons/bi'
import { useRef, useState } from 'react'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import {motion, AnimatePresence} from 'framer-motion'

interface SelectComponentProps {
    value: {value:string, label:string}
    setValue: (value: {value:string, label:string}) => void
    items: {value: string, label: string}[]
}


const SelectComponent = ({value, setValue, items}: SelectComponentProps) => {
    
    const [showOptions, setShowOptions] = useState<boolean>(false)

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
                className="w-full text-start flex items-center p-4 rounded-[12px] bg-primary-400 hover:bg-primary-500 text-white shadow-3">      
                <HiOutlineMenu size={20} className="" />
                <div className='flex-grow mx-2 text-white mt-[2px]'>
                    {value.label}
                </div>
                <BiChevronDown size={20} />
            </button>

            <AnimatePresence>
                {showOptions &&
                <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: "auto"}}
                    exit={{opacity: 0, height: 0}} 
                    className={`w-full overflow-hidden mt-1 bg-primary-400 text-white rounded-[12px] shadow-10 absolute z-[2]`}>
                    {items.map((item, index) => {
                        return(
                            <li key={index} className='list-none'>
                                <button 
                                    key={index}
                                    className='w-full p-4 text-start hover:bg-primary-500'
                                    onClick={() => handleOptionClick(item)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        )
                    })}
                </motion.div>
                }
            </AnimatePresence>


        </div>
    )
}

export default SelectComponent