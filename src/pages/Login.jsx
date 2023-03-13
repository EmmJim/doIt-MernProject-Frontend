import React, { useEffect, useState, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//Components
import Alert from '../components/Alert';

//Hooks
import useAuth from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';


const Login = () => {

    const navigate = useNavigate();

    const {formState, onChange} = useForm({
        email: '',
        password: ''
    })

    const [alert, setAlert] = useState({
        message: ''
    });

    const {email, password} = formState;

    const {auth, setAuth} = useAuth();

    useEffect(() => {
        if(auth.user?._id) navigate('/dashboard')
    }, [auth])


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if(email === '' || password === ''){
            setAlert({
                message: 'All fields are required'
            });
            setTimeout(() => {
                setAlert({
                    message: ''
                });
            }, 3000);
            return;
        }

        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState)
        })
        const data = await result.json();


        if(!data.token){
            setAlert({
                message: data.msg
            });
            setTimeout(() => {
                setAlert({
                    message: ''
                });
            }, 3000);
            return;
        }

        setAlert(false);
        localStorage.setItem('token', data.token);
        await setAuth(data)
    }


    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='text-6xl text-white font-bold mb-8 titulo'>Do it!</h1>
            <div className='bg-white w-1/3 rounded-lg p-6 space-y-8 shadow-md shadow-black'>
                <div className='space-y-4'>
                    <h2 className='font-bold text-2xl text-center'>Sign In</h2>
                    <hr />
                </div>
                { alert.message ? <Alert type="error" message={alert.message} /> : null}
                <form className='mt-6 space-y-5' onSubmit={handleOnSubmit}>
                    <div className='flex flex-col space-y-3'>
                        <label className='font-bold'>Email:</label>
                        <input className='border border-indigo-400 rounded-lg p-1' type="text" placeholder='Your email here' name="email" value={email} onChange={onChange} />
                    </div>
                    <div className='flex flex-col space-y-3'>
                        <label className='font-bold'>Password:</label>
                        <input className='border border-indigo-400 rounded-lg p-1' type="password" placeholder='Your password here' name="password" value={password} onChange={onChange}/>
                    </div>
                    <div className='flex justify-center'>
                        <input className='bg-indigo-700 text-white rounded-lg p-2 font-bold hover:bg-indigo-900 hover:scale-125 ease-out duration-300 hover:cursor-pointer' type="submit" value="Log In" />
                    </div>
                </form>
                <div className='flex justify-end'>
                    <Link to={'/register'}>Don't have an account yet? <span className='font-bold text-indigo-700 hover:cursor-pointer'>Sign Up Here!</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Login