import InputComponent from "../../components/InputComponent/InputComponent"
import AppLayout from "../../layouts/AppLayout"


const TodoView = () => {

    return(
        <AppLayout>
            <div className="w-full flex flex-col justify-center items-center">
                <InputComponent />
            </div>
        </AppLayout>
    )

}

export default TodoView