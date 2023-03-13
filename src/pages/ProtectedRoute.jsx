import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const {auth, loading} = useAuth();

    const spinner = 
    <div className="h-screen flex justify-center items-center">
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    </div>;

    if(loading) return spinner;


    return (
        <>
            {auth.user?._id ? <Outlet /> : <Navigate to='/' />}
        </>
    )
}

export default ProtectedRoute