import {useState, useEffect, createContext} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if(!token){
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
                    headers: {
                        "Content-type": "application/json",
                        'x-token': `${token}`
                    }
                });
                const data = await response.json();

                await setAuth(data);
            } catch (error) {
                setAuth({})
                console.log(error)
            }
            
            setLoading(false);
            
        }

        autenticarUsuario();
    },[])

    const logoutAuth = () => {
        setAuth({});
    }


    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
                setAuth,
                logoutAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;