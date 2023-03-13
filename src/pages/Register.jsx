import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//Components
import Alert from '../components/Alert';

//Hooks
import useAuth from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

const Register = () => {

    const navigate = useNavigate();

    const {formState, onChange} = useForm({
        name: '',
        email: '',
        password: ''
    })

    const {name, email, password} = formState;

    const [alert, setAlert] = useState({
        message: ''
    })

    const {auth} = useAuth();

    useEffect(() => {
        if(auth.user?._id) navigate('/dashboard')
    }, [auth])

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if(name === '' || email === '' || password === ''){
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

        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState)
        })
        const data = await result.json();


        if(!data.user){
            setAlert({
                message: data.errors[0].msg
            });
            setTimeout(() => {
                setAlert({
                    message: ''
                });
            }, 3000);
            return;
        }

        navigate('/');
    }


    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='text-6xl text-white font-bold mb-8 titulo'>Do it!</h1>
            <div className='bg-white w-1/3 rounded-lg p-6 space-y-8 shadow-md shadow-black'>
                <div className='space-y-4'>
                    <h2 className='font-bold text-2xl text-center'>Create your Account</h2>
                    <hr />
                </div>
                { alert.message ? <Alert type="error" message={alert.message} /> : null}
                <form className='mt-6 space-y-5' onSubmit={handleOnSubmit}>
                    <div className='flex flex-col space-y-3'>
                        <label className='font-bold'>Name:</label>
                        <input className='border border-indigo-400 rounded-lg p-1' type="text" placeholder='Your name here' name="name" value={name} onChange={onChange} />
                    </div>
                    <div className='flex flex-col space-y-3'>
                        <label className='font-bold'>Email:</label>
                        <input className='border border-indigo-400 rounded-lg p-1' type="text" placeholder='Your email here' name="email" value={email} onChange={onChange} />
                    </div>
                    <div className='flex flex-col space-y-3'>
                        <label className='font-bold'>Password:</label>
                        <input className='border border-indigo-400 rounded-lg p-1' type="password" placeholder='Your password here' name="password" value={password} onChange={onChange}/>
                    </div>
                    <div className='flex justify-center'>
                        <input className='bg-indigo-700 text-white rounded-lg p-2 font-bold hover:bg-indigo-900 hover:scale-125 ease-out duration-300 hover:cursor-pointer' type="submit" value="Register" />
                    </div>
                </form>
                <div className='flex justify-end'>
                    <Link to={'/'}>Already have an account? <span className='font-bold text-indigo-700 hover:cursor-pointer'>Go to Log In</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Register