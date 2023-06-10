
import { useState } from "react"
import InputComponent from "../../components/Inputs/InputComponent/InputComponent"
import AppLayout from "../../layouts/AppLayout"
import SelectComponent from "../../components/SelectComponent/SelectComponent"


const TodoView = () => {

    const [todo, setTodo] = useState<string>("")

    const [date, setDate] = useState<{value:string, label:string}>(dateItems[0])


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
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
                            Add
                        </button>
                    </div>

                    <div className="w-full">
                        <SelectComponent
                            value={date}
                            onChange={(e) => setDate({value: e.target.value, label: "to do today"})}
                            items={dateItems}
                        />

                    </div>

                </div>

            </div>
        </AppLayout>
    )

}

export default TodoView



const dateItems = [
    {value: "today", label: "to do today"},
    {value: "week", label: "to do this week"},
    {value: "month", label: "to do this month"},
]