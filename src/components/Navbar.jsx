import React from 'react'
import { NavLink } from 'react-router-dom'
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
            <NavLink to={'/dashboard'} className="titulo text-2xl text-indigo-600 hover:scale-125 ease-out duration-300">Do It!</NavLink>
            <div className='space-x-4'>
                <NavLink 
                    to={'/dashboard'} 
                    className={({ isActive }) =>
                        isActive ? "text-indigo-600 font-bold border-b-2 border-indigo-600 ease-in-out duration-300" : "text-indigo-600 font-bold border-b-2 border-transparent hover:border-indigo-600 ease-in-out duration-300"
                    }>Dashboard
                </NavLink>
                <NavLink 
                    to={'/todos/add'} 
                    className={({ isActive }) =>
                        isActive ? "text-indigo-600 font-bold border-b-2 border-indigo-600 ease-in-out duration-300" : "text-indigo-600 font-bold border-b-2 border-transparent hover:border-indigo-600 ease-in-out duration-300"
                    }>Add New Todo<i className="ml-2 fa-solid fa-circle-plus"></i>
                </NavLink>
                <button onClick={handleLogout} className="bg-indigo-600 text-white font-bold hover:bg-indigo-900 ease-in-out duration-300 p-2 rounded-lg">Log Out<i className="ml-3 fa-solid fa-right-from-bracket"></i></button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar