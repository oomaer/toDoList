
import { useEffect, useState } from "react"
import InputComponent from "../../components/Inputs/InputComponent/InputComponent"
import AppLayout from "../../layouts/AppLayout"
import SelectComponent from "../../components/SelectComponent/SelectComponent"
import TodoItems from "./TodoItems"
import { TodoType } from "../../types/todo.type"
import { useAuth } from "../../context/UserContext/UserContextProvider"
import { CREATE_TODO, GET_TODOS } from "../../api/api"
import { toast } from "react-toastify"


const TodoView = () => {

    const [todo, setTodo] = useState<string>("")

    const [filter, setFilter] = useState<{value:string, label:string}>(filterItems[0])

    const [todoItems, setTodoItems] = useState<TodoType[]>([]);

    const {user, isAuthenticated} = useAuth()


    const handleAddItem = async () => {
        
        if(todo === "") return

        const newTodoItem: TodoType = {
            _id: Math.random().toString(),
            description: todo,
            completed: false,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        }

        if(isAuthenticated && user){
            try{
                let response = await CREATE_TODO(todo, user._id);
                if(response.data.success){
                    let tempItems = [...todoItems]
                    tempItems.unshift(response.data.todo)
                    setTodoItems(tempItems)
                    setTodo("")
                }
            }
            catch(error:any){
                console.log(error);
                toast.error(error.message)
            }
        }
        else{
            let tempItems = [...todoItems]
            tempItems.unshift(newTodoItem)
            setTodoItems(tempItems)
            setTodo("")
            return
        } 
    }


    useEffect(() => {
        
        const getTodos = async () => {
            try{
                const response = await GET_TODOS(user?._id || "")
                if(response.data.success){
                    setTodoItems(response.data.todos)
                    return
                }
            }catch(error:any){
                console.log(error);
                toast.error(error.message)
            }
        }
        
        if(isAuthenticated && user){
            getTodos()
        }

    }, [isAuthenticated, user])

    return(
        <AppLayout>
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-[500px] flex flex-col justify-center items-center">
                    
                    <div className="flex w-full">
                        <div className="flex flex-grow">
                            <InputComponent
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                                placeholder="Add a todo"
                            />
                        </div>
                        <button
                            onClick={handleAddItem}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
                            Add
                        </button>
                    </div>

                    <div className="w-full">
                        <SelectComponent
                            value={filter}
                            setValue={setFilter}
                            items={filterItems}
                        />
                    </div>

                    <div className="w-full">
                        <TodoItems items={todoItems} setItems={setTodoItems} />
                    </div>
                    

                </div>

            </div>
        </AppLayout>
    )

}

export default TodoView



const filterItems = [
    {value: "today", label: "to do today"},
    {value: "week", label: "to do this week"},
    {value: "month", label: "to do this month"},
]
