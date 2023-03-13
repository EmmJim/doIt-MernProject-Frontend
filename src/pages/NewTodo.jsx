import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//Components
import Navbar from '../components/Navbar'

const NewTodo = () => {

    const navigate = useNavigate();

    const [newTodo, setNewTodo] = useState({
        title: "",
        description: "",
        status: false
    })

    const {title, description, status} = newTodo;

    const handleOnChange = (e) => {
        let updatedValue = e.target.value;
        if(updatedValue === "true" || updatedValue === "false"){
            updatedValue = JSON.parse(updatedValue);
        }

        setNewTodo((prevValue) => ({
            ...prevValue,
            [e.target.name]: updatedValue
        }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if(title === '' || description === ''){
            return console.log('Error');
        }


        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-token': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newTodo)
        })
        const data = await result.json();

        

        navigate('/dashboard');


    }

    return (
        <div>
            <Navbar />
            <div className='mt-10 w-3/4 mx-auto space-y-10'>
                <h1 className='font-bold text-4xl text-white'>New Todo</h1>
                <div className=''>
                    <h2 className='text-white font-bold text-2xl titulo'>Start adding new todos!</h2>
                </div>

                <form className='mt-6 p-5 bg-white space-y-5 rounded-lg' onSubmit={handleOnSubmit}>
                    <div className='flex flex-col space-y-3'>
                        <label className='font-bold'>Title:</label>
                        <input className='border border-indigo-400 rounded-lg p-1' onChange={handleOnChange} name="title" value={title} type="text" placeholder='To Do title'/>
                    </div>
                    <div className='flex flex-col space-y-3'>
                        <label className='font-bold'>Description:</label>
                        <input className='border border-indigo-400 rounded-lg p-1' onChange={handleOnChange} name="description" value={description} type="text" placeholder='To Do description'/>
                    </div>
                    <div className='flex flex-col space-y-3'>
                        <label className='font-bold'>Status:</label>
                        <select className="border border-indigo-400 rounded-lg p-1" onChange={handleOnChange} name="status">
                            <option defaultValue value={false}>-- Select --</option>
                            <option value={true} className='bg-green-600 text-white font-bold'>Done</option>
                            <option value={false} className='bg-red-600 text-white font-bold'>To Do</option>
                        </select>
                    </div>
                    <div className='flex justify-center'>
                        <input className='bg-indigo-700 text-white rounded-lg p-2 font-bold hover:bg-indigo-900 hover:scale-125 ease-out duration-300 hover:cursor-pointer' type="submit" value="Add Todo" />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default NewTodo