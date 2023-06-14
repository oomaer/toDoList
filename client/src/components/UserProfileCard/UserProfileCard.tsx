import { User } from "../../types/user.type"


const UserProfileCard = ({ user }: {user: User | null}) => {

    
    return(
        <div className="flex flex-col items-center">
            {user && (
                <>
                    <img className="w-32 h-32 rounded-full mb-4 shadow-10 bg-primary-400" 
                        src={`https://robohash.org/${user._id}`} />
                    <p className="text-2xl text-white" data-testid="username">{user.name}</p>
                </>
            )}
        </div>
    )
}

export default UserProfileCard