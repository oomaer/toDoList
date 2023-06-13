import { BsCheck } from "react-icons/bs"
import { TodoType } from "../../types/todo.type"
import { CiMenuKebab } from "react-icons/ci"
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import moment from "moment";


interface TodoItemProps {
    item: TodoType
    handleCheck: (todo: TodoType) => void
    handleDelete: (todo: TodoType) => void
}

const TodoItem = ({item, handleCheck, handleDelete}: TodoItemProps) => {


    const [showMenu, setShowMenu] = useState<boolean>(false)

    const menuButtonRef = useRef(null);


    useOutsideAlerter(menuButtonRef, () => {
        setShowMenu(false)
    })
    
    return(
        <div className="w-full flex items-center w-full p-4 border-b-[1px]">
            <div>
                <button
                    className={`rounded-full w-4 h-4 border-[2px] border-primary-400 text-white flex items-center justify-center mr-4 ${item.completed ? "bg-primary-400" : ""}`}
                    onClick={() => {handleCheck(item)}}
                    aria-label="check"
                >
                    {item.completed ? (
                        <BsCheck size={16} />
                    ): null}
                </button>
            </div>
            <div className="flex-grow mr-4">
                <p>{item.description}</p>
                <div className={`flex items-center ${item.completed?"max-h-[24px]": "max-h-[0px]"} transition-all`}>
                    {item.completed && (
                        <p className="text-xs text-gray-400">Completed {moment(item.updatedAt).fromNow()}</p>
                    )}
                </div>
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
                            className="absolute p-2 rounded-[8px] text-sm w-[100px] right-0 bg-white bg-opacity-50 shadow-2xl origin-top-right"
                            onClick={() => {
                                handleDelete(item)
                                setShowMenu(false)
                            }}
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