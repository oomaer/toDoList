import Navbar from "../components/Navbar/Navbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return(
        <div className="flex flex-col min-h-[100vh]">
            <Navbar />
            <div className="flex flex-grow w-full max-w-[1400px] mx-auto px-[5vw] md:px-6"> 
                {children}
            </div>
        </div>
    )
}

export default AppLayout