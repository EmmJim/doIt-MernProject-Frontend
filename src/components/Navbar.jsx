import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navbar = () => {

    const {logoutAuth} = useAuth();

    const handleLogout = () => {
        logoutAuth();
        localStorage.removeItem('token');
    }

  return (
    <div className='bg-white p-5 shadow-md shadow-slate-700'>
        <nav className=' flex items-center justify-between'>
            <Link to={'/'} className="titulo text-2xl text-indigo-600 hover:scale-125 ease-out duration-300">Do It!</Link>
            <div className='space-x-4'>
                <Link to={'/'} className="text-indigo-600 font-bold border-b-2 border-transparent hover:border-indigo-600 ease-in-out duration-300">Dashboard</Link>
                <Link to={'/my-todos'} className="text-indigo-600 font-bold border-b-2 border-transparent hover:border-indigo-600 ease-in-out duration-300">My Todo List</Link>
                <button onClick={handleLogout} className="bg-indigo-600 text-white font-bold hover:bg-indigo-900 ease-in-out duration-300 p-2 rounded-lg">Log Out<i className="ml-3 fa-solid fa-right-from-bracket"></i></button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar