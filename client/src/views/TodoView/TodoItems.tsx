import TodoItem from "../../components/TodoItem/TodoItem";
import { TodoType } from "../../types/todo.type";


const TodoItems = ({items}: {items:TodoType[]}) => {

    return(
        <div className="bg-white rounded-[12px] shadow-2xl">
            {items.map((item, index) => {
                return(
                    <TodoItem key={index} item={item} handleCheck={()=>{}} handleDelete={()=>{}} />
                )
            })}
        </div>
    )

}

export default TodoItems