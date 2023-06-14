import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"
import AppLayout from "../../layouts/AppLayout"



const LoadingView = () => {
    return (
        <AppLayout>
            <div className="flex justify-center item-center">
                <LoadingComponent size="80" />        
            </div>
        </AppLayout>
    )
}

export default LoadingView