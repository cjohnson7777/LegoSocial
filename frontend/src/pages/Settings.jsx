import { useState } from "react"
import { logout, update_user } from "../api/endpoints"
import { useNavigate } from "react-router-dom"

const Settings = () => {

    const storage = JSON.parse(localStorage.getItem('userData'))

    const [username, setUsername] = useState(storage ? storage.username : '')
    const [email, setEmail] = useState(storage ? storage.email : '')
    const [firstName, setFirstName] = useState(storage ? storage.first_name : '')
    const [lastName, setLastName] = useState(storage ? storage.last_name : '')
    const [bio, setBio] = useState(storage ? storage.bio : '')

    const [profileImg, setProfileImg] = useState(storage ? storage.profile_img : '')

    const nav = useNavigate()

    const handleLogout = async () => {
        try{
            await logout()
            nav('/login')
        }catch (error){
            console.log(error)
        }
    }
    

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await update_user({'username': username, 'bio': bio, 'profile_img': profileImg, 'email': email, 'first_name': firstName, 'last_name': lastName})
            localStorage.setItem('userData', JSON.stringify({'username': username, 'bio': bio, 'email': email, 'first_name': firstName, 'last_name': lastName}))
            alert('updated successfully')
        }catch (error){
            console.log(error)
        }

    }
    return (
        <div className="flex flex-col justify-center align-center items-center gap-6 py-10">
            <h1 className="text-4xl font-semibold">Update Profile</h1>
            <form onSubmit={handleUpdate} className="flex flex-col space-y-3">
                <label>Profile Image</label>
                <input onChange={(e) => setProfileImg(e.target.files[0])} className="border border-gray-400 rounded-sm px-1 cursor-pointer" type="file" />
                <label >Username:</label>
                <input  id='username' className="border border-gray-400 rounded-sm px-1" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
                <label >Email:</label>
                <input id='email' className="border border-gray-400 rounded-sm px-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-mail"/>
                <label >First Name:</label>
                <input id='firstName' className="border border-gray-400 rounded-sm px-1" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"/>
                <label >Last Name:</label>
                <input id='lastName' className="border border-gray-400 rounded-sm px-1" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/>
                <label>Bio:</label>
                <textarea name="bio" id="bio" className="border border-gray-400 rounded-sm px-1" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="bio"></textarea>

    
                <button className="bg-gray-700 text-white rounded-sm font-bold hover:bg-gray-600 cursor-pointer h-9" type="submit">Update</button>
            </form>
            <button onClick={handleLogout} className="text-sm border px-2 py-1 rounded-sm text-sm cursor-pointer bg-red-500/90 hover:bg-red-600 mt-6">Logout</button>
        </div>
    )
}

export default Settings