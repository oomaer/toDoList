
import { useEffect, useState } from "react"
import InputComponent from "../../components/Inputs/InputComponent/InputComponent"
import AppLayout from "../../layouts/AppLayout"
import SelectComponent from "../../components/SelectComponent/SelectComponent"
import TodoItems from "./TodoItems"
import { TodoType } from "../../types/todo.type"
import { useAuth } from "../../context/UserContext/UserContextProvider"
import { CREATE_TODO, GET_FILTERED_TODOS } from "../../api/api"
import { toast } from "react-toastify"
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard"
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"
import TodoViewShimmer from "./TodoViewShimmer"


const TodoView = () => {

    const [todo, setTodo] = useState<string>("")

    const [filter, setFilter] = useState<{value:string, label:string}>(filterItems[0])

    const [todoItems, setTodoItems] = useState<TodoType[]>([]);

    const {user, isAuthenticated, userLoading} = useAuth()

    const [addLoading, setAddLoading] = useState<boolean>(false)
    const [getLoading, setGetLoading] = useState<boolean>(false)


    //method called when add button is clicked
    const handleAddItem = async () => {
        if(addLoading) return
        if(todo === "") {
            toast.error("Please enter a todo")
            return
        } 

        const newTodoItem: TodoType = {
            _id: Math.random().toString(),
            description: todo,
            completed: false,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        }

        setAddLoading(true)
        if(isAuthenticated && user){
            try{
                let response = await CREATE_TODO(todo, user._id);
                if(response.data.success){
                    let tempItems = [...todoItems]
                    tempItems.unshift(response.data.todo)
                    setTodoItems(tempItems)
                    setTodo("")
                    toast.success("Todo Added Successfully")
                }
                setAddLoading(false)
            }
            catch(error:any){
                setAddLoading(false)
                console.log(error);
                toast.error(error.message)
            }
        }
        else{
            let tempItems = [...todoItems]
            tempItems.unshift(newTodoItem)
            setTodoItems(tempItems)
            setTodo("")
            setAddLoading(false)
            toast.success("Todo Added Successfully")
            return
        } 
    }


    /*
        This useEffect will help us to fetch todos from the server
        If the user is authenticated, we will fetch todos from the server
        Also fetches todos if the filter value changes
    */
    useEffect(() => {
        
        const getTodos = async () => {
            setGetLoading(true)
            try{
                const response = await GET_FILTERED_TODOS(user?._id || "", filter.value)
                if(response.data.success){
                    setTodoItems(response.data.todos)
                    setGetLoading(false)
                    return
                }
                setGetLoading(false)
            }catch(error:any){
                setGetLoading(false)
                console.log(error);
                toast.error(error.message)
            }
        }
        
        if(isAuthenticated && user){
            getTodos()
        }

    }, [isAuthenticated, user, filter])

    if(userLoading) return <TodoViewShimmer />
    return(
        <AppLayout>
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-[500px] flex flex-col justify-center items-center">
                    
                    <div className="mb-8">
                        <UserProfileCard user={user} />
                    </div>

                    <div className="flex w-full mb-2">
                        <div className="flex flex-grow">
                            <InputComponent
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                                placeholder="Add a todo"
                                onEnter={handleAddItem}
                            />
                        </div>
                        <button
                            onClick={handleAddItem}
                            disabled={addLoading}
                            className="bg-primary-400 hover:bg-primary-500 shadow-3 text-white px-4 py-2 rounded-[6px] ml-2 w-[62px] flex justify-center items-center">
                            {addLoading ? <LoadingComponent size="12" color="#ffffff" /> : "Add"}
                        </button>
                    </div>

                    <div className="w-full mb-2">
                        <SelectComponent
                            value={filter}
                            setValue={setFilter}
                            items={filterItems}
                        />
                    </div>

                    {getLoading ? (
                        <div className="w-full h-[50vh] max-h-[100px] flex justify-center items-center shadow-3 rounded-[10px] bg-white bg-opacity-50"> 
                            <LoadingComponent size = "50" />
                        </div>
                    ): (
                        <div className="w-full">
                            <TodoItems items={todoItems} setItems={setTodoItems} />
                        </div>
                    )}

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
