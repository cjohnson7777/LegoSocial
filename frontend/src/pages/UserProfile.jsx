import { useEffect, useState } from "react"
import { get_user_profile } from "../api/endpoints"
import { SERVER_URL } from "../constants"
import { useNavigate } from "react-router-dom"

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
    const [name, setName] = useState('')


    const[isOurProfile, setIsOurProfile] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data  = await get_user_profile(username)
                console.log(data)
                setBio(data.bio)
                setProfileImg(data.profile_img)
                setLikes(data.likes)
                setSaves(data.saves)
                setIsOurProfile(data.is_our_profile)
                setName(data.first_name)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }

        }
        fetchData()

    }, [])

    const nav = useNavigate()
    
    const handleEdit = async () => {
        nav('/settings')
    }

    return (
        <div className="mx-auto">
            <div className="flex items-start mb-5">
                <img src={loading ? null :`${SERVER_URL}${profileImg}`} alt="profile-picture" className="mr-10 border-2  rounded-full size-50 overflow-hidden"/>
                <div>
                <h1 className="text-4xl font-medium mt-20">{name}</h1>
                <h1 className="text-2xl font-semibold text-gray-700">@{username}</h1>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-start">
                <p>{loading ? 'loading' : bio}</p>
                {isOurProfile ? <div className="flex justify-center">
                    <button onClick={handleEdit} type='button' className="items-center rounded-md bg-gray-700 px-2 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 cursor-pointer w-30">Edit Profile</button>
                </div> : <div></div>} 
            </div>
            <div className="flex flex-col mt-10 space-y-10 py-10">
                <div className="">
                    <h1 className="mb-2 text-xl font-medium">Likes</h1>
                        <div className="flex grid grid-cols-3 gap-4">
                            {loading ? 'loading' : likes.map((set) => {
                                return (
                                    <div key={set.set_num} className="flex flex-col items-center border rounded-md bg-white p-2 h-60">
                                        <img src={set.img_url} className="rounded-sm overflow-hidden" alt="" />
                                        <p>{set.name}</p>
                                        <p>{set.pieces}</p>
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
                                    <div key={set.set_num}>
                                        <div key={set.set_num} className="flex flex-col items-center border rounded-md bg-white p-2 ">
                                            <img src={set.img_url} className="rounded-sm" alt="" />
                                            <p>{set.name}</p>
                                            <p>{set.pieces}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                </div>

                
            </div>
            
        </div>

    )
}