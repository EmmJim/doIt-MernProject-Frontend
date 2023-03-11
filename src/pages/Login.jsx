import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })


    const {email, password} = user;

    const {auth, setAuth} = useAuth();

    useEffect(() => {
        if(auth.user?._id) navigate('/dashboard')
    }, [auth])

    const handleOnChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if(email === '' || password === ''){
            return console.log('Error');
        }


        const result = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        const data = await result.json();

        if(data.token){
            localStorage.setItem('token', data.token);
            await setAuth(data)
        }

    }


    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='text-6xl text-white font-bold mb-8 titulo'>Do it!</h1>
            <div className='bg-white w-1/3 rounded-lg p-6 space-y-8 shadow-md shadow-black'>
                <div className='space-y-4'>
                    <h2 className='font-bold text-2xl text-center'>Sign In</h2>
                    <hr />
                </div>
                <form className='mt-6 space-y-5' onSubmit={handleOnSubmit}>
                    <div className='flex flex-col space-y-3'>
                        <label className='font-bold'>Email:</label>
                        <input className='border border-indigo-400 rounded-lg p-1' type="text" placeholder='Your email here' name="email" value={email} onChange={handleOnChange} />
                    </div>
                    <div className='flex flex-col space-y-3'>
                        <label className='font-bold'>Password:</label>
                        <input className='border border-indigo-400 rounded-lg p-1' type="password" placeholder='Your password here' name="password" value={password} onChange={handleOnChange}/>
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