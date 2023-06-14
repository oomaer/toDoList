import AppLayout from "../../layouts/AppLayout"


const TodoViewShimmer = () => {
    return(
        <AppLayout>
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-[500px] flex flex-col justify-center items-center">
                    
                    <div className="mb-8">
                        <div className="w-32 h-32 rounded-full shimmerBG" />
                    </div>

                    <div className="flex w-full mb-2">
                        <div className="flex flex-grow">
                            <div className="w-full h-10 rounded-[6px] shimmerBG" />
                        </div>
                        <div className="w-[62px] h-10 rounded-[6px] shimmerBG ml-2" />
                    </div>

                    <div className="w-full mb-2">
                        <div className="w-full h-10 rounded-[6px] shimmerBG" />
                    </div>
                    <div className="w-full h-[50vh] max-h-[100px] flex justify-center items-center shadow-3 rounded-[10px] bg-white bg-opacity-50 shimmerBG">
                    </div>
                </div>

            </div>
        </AppLayout>
    )
}

export default TodoViewShimmer