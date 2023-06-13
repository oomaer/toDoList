import { ThreeDots } from "react-loader-spinner"


const LoadingComponent = ({size}: {size?: string}) => {
    return(
        <ThreeDots 
            height={size ? size: "80"} 
            width={size ? size : "80"} 
            radius="8"
            color="#00BAFC" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
        />
    )
}

export default LoadingComponent