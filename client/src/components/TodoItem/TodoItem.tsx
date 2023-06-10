import { HiOutlineCheck } from "react-icons/hi"
import { TodoType } from "../../types/todo.type"
import { CiMenuKebab } from "react-icons/ci"
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOutsideAlerter from "../hooks/useOutsideAlerter";


interface TodoItemProps {
    item: TodoType
    handleCheck: (id: string) => void
    handleDelete: (id: string) => void
}

const TodoItem = ({item, handleCheck, handleDelete}: TodoItemProps) => {


    const [showMenu, setShowMenu] = useState<boolean>(false)

    const menuButtonRef = useRef(null);


    useOutsideAlerter(menuButtonRef, () => {
        setShowMenu(false)
    })

    
    return(
        <div className="w-full flex items-center w-full p-4 border-b-[1px]">
            <button
                className="rounded-full w-4 h-4 border-[2px] border-[#a59d81] text-white flex items-center justify-center mr-4"
                onClick={() => {handleCheck(item._id)}}
                aria-label="check"
            >
                {item.completed ? (
                    <HiOutlineCheck size={16} />
                ): null}
            </button>
            <div className="flex-grow mr-4">
                {item.description}
            </div>
            <div className="relative" ref={menuButtonRef}>
                <button className="flex" aria-label="menu" onClick={()=>setShowMenu(b=>!b)}>
                    <CiMenuKebab size={16} />
                </button>
                <AnimatePresence>
                    {showMenu && (
                        <motion.button
                            initial={{opacity: 0, scale: 0}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0}}
                            className="absolute p-2 rounded-[8px] text-sm w-[100px] right-0 bg-white shadow-2xl origin-top-right"
                            onClick={() => handleDelete(item._id)}
                            aria-label="delete"
                        >
                            Delete
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

        </div>
    )
}

export default TodoItem