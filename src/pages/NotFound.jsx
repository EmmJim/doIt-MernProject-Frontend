import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center text-white space-y-5'>
        <p className="titulo text-6xl">Do It!</p>
        <h1 className='text-3xl'>404 Page Not Found</h1>
        <p className='text-lg'>You may entered to a nonexistent page</p>
        <Link to={'/'} className="bg-white rounded-lg text-black p-2 font-bold shadow-lg cursor-pointer hover:scale-125 ease-out duration-300">Go to Log In</Link>
    </div>
  )
}

export default NotFound