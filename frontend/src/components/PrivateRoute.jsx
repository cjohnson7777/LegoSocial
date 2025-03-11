import { useAuth } from "../context"
import { Navigate } from "react-router-dom"


const PrivateRoute = ({children}) => {
    const {auth, authLoading} = useAuth()

    if(authLoading){
        return <div>Loading...</div>
    }

    if (auth){
        return children
    }else {
        return <Navigate to='/login' />
    }
}

export default PrivateRoute