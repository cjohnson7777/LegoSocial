import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context"

function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {auth_login} = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        auth_login(username, password)
    }

    const getUsername = () => {
        return username
    }

    const handleNav = () => {
        navigate('/register')
    }

    return (
        <div className="flex flex-col items-center  h-1/2 justify-center mt-30">
            <h1 className="text-5xl mb-4">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col space-y-2 w-1/4">
                <label >Username:</label>
                <input  id='username' className="border border-gray-300 rounded-sm mb-5" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
                <label >Password:</label>
                <input id='password' className="border border-gray-300 rounded-sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                <button className="bg-gray-600 text-white font-bold" type="submit">Login In</button>
                <p className="text-sm">Don't have an account? <span className="text-blue-700 cursor-pointer" onClick={handleNav}>Sign Up</span></p>

            </form>
        </div>
    )
}

export default Login