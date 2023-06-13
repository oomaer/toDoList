import { ThreeDots } from "react-loader-spinner"


const LoadingComponent = ({size, color}: {size?: string, color?: string}) => {
    return(
        <ThreeDots 
            height={size ? size: "80"} 
            width={size ? size : "80"} 
            radius="8"
            color= {color?color:"#00BAFC"} 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
        />
    )
}

export default LoadingComponent