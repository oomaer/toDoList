import { DELETE_TODO, UPDATE_TODO } from "../../api/api";
import TodoItem from "../../components/TodoItem/TodoItem";
import { TodoType } from "../../types/todo.type";
import { toast } from 'react-toastify'
import {motion} from 'framer-motion'

const TodoItems = ({items, setItems}: {items:TodoType[], setItems: (i:TodoType[])=>void}) => {


    const handleCheck = async (todo: TodoType) => {
            // update todo
        try{
            const response = await UPDATE_TODO(todo._id, !todo.completed)
            if(response.data.success){
                const tempItems = [...items]
                const index = tempItems.findIndex((item) => item._id === todo._id)
                tempItems[index].completed = !tempItems[index].completed
                tempItems[index].updatedAt = new Date().toString()
                setItems(tempItems)
            }
        }
        catch(error:any){
            console.log(error);
            toast.error(error.message)
        }
    }

    const handleDelete = async (todo: TodoType) => {
        // delete todo
        try{
            const response = await DELETE_TODO(todo._id)
            if(response.data.success){
                const filteredItems = items.filter((item) => item._id !== todo._id)
                setItems(filteredItems)
            }
            toast.success("Todo Deleted Successfully")
        }
        catch(error:any){
            console.log(error);
            toast.error(error.message)
        }
    }


    if(items.length === 0){
        return(
            <div className="h-[50vh] max-h-[100px] overflow-y-auto shadow-3 rounded-[10px] bg-white bg-opacity-50"> 
                <p className="p-4">
                    Wow, its empty!
                </p>
            </div>
        )
    }

    return(
        <div className="flex bg-white bg-opacity-50 overflow-hidden shadow-3 rounded-[10px]">
            <motion.div 
                initial={{maxHeight:0}}
                animate={{maxHeight:450}}
                className="w-full h-[50vh] max-h-[450px] overflow-y-auto custom-scrollbar"> 
                {items.map((item, index) => {
                    return(
                        <TodoItem key={index} item={item} handleCheck={handleCheck} handleDelete={handleDelete} />
                    )
                })}
            </motion.div>
        </div>
    )

}

export default TodoItems