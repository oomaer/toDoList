import { UPDATE_TODO } from "../../api/api";
import TodoItem from "../../components/TodoItem/TodoItem";
import { useAuth } from "../../context/UserContext/UserContextProvider";
import { TodoType } from "../../types/todo.type";
import { toast } from 'react-toastify'

const TodoItems = ({items, setItems}: {items:TodoType[], setItems: (i:TodoType[])=>void}) => {

    const {isAuthenticated, user} = useAuth();

    const handleCheck = async (todo: TodoType) => {
        if(isAuthenticated){
            // update todo
            try{
                const response = await UPDATE_TODO(todo._id, !todo.completed)
                if(response.data.success){
                    let tempItems = [...items]
                    let index = tempItems.findIndex((item) => item._id === todo._id)
                    tempItems[index].completed = !tempItems[index].completed
                    setItems(tempItems)
                }
            }
            catch(error:any){
                console.log(error);
                toast.error(error.message)
            }
        }
        else{
            let tempItems = [...items]
            let index = tempItems.findIndex((item) => item._id === todo._id)
            tempItems[index].completed = !tempItems[index].completed
            setItems(tempItems)
        }
    }

    const handleDelete = async (todo: TodoType) => {
        if(isAuthenticated){
            // delete todo
            try{
                const response = await UPDATE_TODO(todo._id, !todo.completed)
                if(response.data.success){
                    let filteredItems = items.filter((item) => item._id !== todo._id)
                    setItems(filteredItems)
                }
            }
            catch(error:any){
                console.log(error);
                toast.error(error.message)
            }
        }
        else{
            let filteredItems = items.filter((item) => item._id !== todo._id)
            setItems(filteredItems)
        }
    }

    return(
        <div className="bg-white rounded-[12px] shadow-2xl overflow-hidden h-[50vh] max-h-[600px] ">
            {items.length === 0 ? (
                <p className="p-4">Wow, its empty</p>
            ): (
                <>
                {items.map((item, index) => {
                    return(
                        <TodoItem key={index} item={item} handleCheck={handleCheck} handleDelete={handleDelete} />
                    )
                })}
                </>
            )}
            
        </div>
    )

}

export default TodoItems