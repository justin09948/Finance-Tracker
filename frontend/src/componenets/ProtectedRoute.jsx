import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute(){
    const token = localStorage.getItem('Token')

    return(
        token ? <Outlet></Outlet> : <Navigate to={"/"}></Navigate>
    )
}

export default ProtectedRoute