import { useEffect, useState } from "react"
import { get_user_profile } from "../api/endpoints"
import { SERVER_URL } from "../constants"

function UserProfile() {
    function get_username(){
        const split_url = window.location.pathname.split('/')
        return split_url[split_url.length - 1]
    }

    const [username, setUsername] = useState(get_username())

    useEffect(() => {
        setUsername(get_username())
    }, [])

    return (
        <div className="flex flex-col justify-center items-center w-1/2 mx-auto">
            <div className="">
                <UserDetails username={username}/>
            </div>
        </div>
    )
}

export default UserProfile

function UserDetails( { username }){

    const [loading, setLoading] = useState(true)
    const [bio, setBio] = useState('')
    const [profileImg, setProfileImg] = useState('')
    const [likes, setLikes] = useState([])
    const [saves, setSaves] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data  = await get_user_profile(username)
                console.log(data)
                setBio(data.bio)
                setProfileImg(data.profile_img)
                setLikes(data.likes)
                setSaves(data.saves)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }

        }
        fetchData()

    }, [])

    return (
        <div className="mx-auto">
            <div className="flex items-start mb-5">
                <img src={loading ? null :`${SERVER_URL}${profileImg}`} alt="profile-picture" className="mr-5 border-2  rounded-full size-50 overflow-hidden"/>
                <h1 className="text-2xl font-semibold mt-20">@{username}</h1>
            </div>
            <div className="flex flex-col">
                <p>{loading ? 'loading' : bio}</p>
                <div className="flex justify-center">
                    <button type='button' className="items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 cursor-pointer w-50">Edit Bio</button>
                </div>
 
            </div>
            <div className="flex flex-col mt-10 space-y-10">
                <div className="">
                    <h1 className="mb-2 text-xl font-medium">Likes</h1>
                        <div className="flex grid grid-cols-3 gap-4">
                            {loading ? 'loading' : likes.map((set) => {
                                return (
                                    <div>

                                    </div>
                                )
                            })}
                        </div>
                </div>
                <div>
                    <h1 className="mb-2 text-xl font-medium">Your Collection</h1>
                        <div className="flex grid grid-cols-3 gap-4">
                            {loading ? 'loading' : saves.map((set) => {
                                    return (
                                        <div>

                                        </div>
                                    )
                                })}
                        </div>
                </div>

                
            </div>
            
        </div>

    )
}