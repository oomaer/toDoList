
interface PrimaryButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const PrimaryButton = ({children, onClick}: PrimaryButtonProps) => {
    return (
        <button
         onClick={onClick}
         className="w-full bg-primary-400 hover:bg-primary-500 text-white font-bold py-2 px-4 rounded">
            {children}
        </button>
    )
}

export default PrimaryButton