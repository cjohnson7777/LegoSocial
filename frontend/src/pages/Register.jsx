import { useState } from "react"
import { register } from "../api/endpoints"
import { useNavigate } from "react-router-dom"

function Register(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const navigate = useNavigate()

    const handleNav = () => {
        navigate('/login')
    }

    const handleRegistration = async (e) => {
        e.preventDefault()
        if (password === verifyPassword){
            try{
                await register(username, email, firstName, lastName, password)
                alert('Registration successful')
                navigate('/login')
            }catch {
                alert('Error registering')
            }
        }else{
            alert('Passwords do not match')
        }
    }

    return (
        <div className="flex flex-col items-center  h-1/2 justify-center mt-15">
            <h1 className="text-5xl mb-4">Sign Up</h1>
            <form onSubmit={handleRegistration} className="flex flex-col space-y-3 w-1/4">
                <label >Username:</label>
                <input  id='username' className="border border-gray-300 rounded-sm" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
                <label >Email:</label>
                <input id='email' className="border border-gray-300 rounded-sm" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-mail"/>
                <label >First Name:</label>
                <input id='firstName' className="border border-gray-300 rounded-sm" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"/>
                <label >Last Name:</label>
                <input id='lastName' className="border border-gray-300 rounded-sm" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/>
                <label >Password:</label>
                <input id='password' className="border border-gray-300 rounded-sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                <label >Confirm Password:</label>
                <input id='verify-password' className="border border-gray-300 rounded-sm" type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} placeholder="confirm password"/>
    
                <button className="bg-gray-600 text-white font-bold" type="submit">Register</button>
                <p className="text-sm">Already have an account? <span className="text-blue-700 cursor-pointer" onClick={handleNav}>Login</span></p>
            </form>
        </div>
    )
}

export default Register