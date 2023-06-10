import { User } from "../../types/user.type"


const UserProfileCard = ({ user }: {user: User | null}) => {

    
    return(
        <div className="flex flex-col items-center">
            {user ? (
                <>
                    <img className="w-32 h-32 rounded-full mb-4" 
                        src={`https://robohash.org/${user._id}`} />
                
                </>
            ): (
                <>
                    <img className="w-32 h-32 rounded-full mb-4 shadow-10" 
                        src={`https://robohash.org/guestuser`}
                    />
                    <p className="text-2xl text-white">Guest User</p>
                </>
            )}

        </div>
    )
}

export default UserProfileCard