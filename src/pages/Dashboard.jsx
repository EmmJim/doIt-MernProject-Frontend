import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

//Hooks
import useAuth from '../hooks/useAuth'

//Components
import Navbar from '../components/Navbar'
import TodosTable from '../components/TodosTable';

const Dashboard = () => {

  const {auth} = useAuth();

  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState(null);

  const {current: todosArray} = useRef(todos);

  const getTodos = async() => {
    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todos`);
    const data = await result.json();

    const todosByUser = data.todos.filter((todo) => todo.userId === auth.user._id);

    setTodos(todosByUser);
  }
  
  useEffect(() => {
    if(filter !== null){
      getTodos();
      const filteredTodos = todos.filter(todo => todo.status === filter);

      setFilteredTodos(filteredTodos);
      return;
    } 
    getTodos();
  }, [todosArray.length, filter]);
  
  const handleFilterTodos = (status) => {
    setFilter(status);
  }

  return (
    <div>
      <Navbar />
      <div className='mt-10 w-3/4 mx-auto space-y-10'>
          <h1 className='font-bold text-4xl text-white'>Welcome {auth.user.name}!</h1>
          <div className=''>
            <h2 className='text-white font-bold text-2xl titulo'>Your Todos</h2>
            <div className='flex space-x-5'>
              <button onClick={() => handleFilterTodos(false)} className='mt-10 p-2 bg-white rounded-lg font-bold hover:bg-indigo-300 ease-out duration-300'>Pending<i className="ml-2 fa-regular fa-clock"></i></button>
              <button onClick={() => handleFilterTodos(true)} className='mt-10 p-2 bg-white rounded-lg font-bold hover:bg-indigo-300 ease-out duration-300'>Completed<i className="ml-2 fa-solid fa-check"></i></button>
              <button onClick={() => handleFilterTodos(null)} className='mt-10 p-2 bg-white rounded-lg font-bold hover:bg-indigo-300 ease-out duration-300'>All Todos ({todos.length})<i className="ml-2 fa-solid fa-list"></i></button>
            </div>
            {
              todos.length ? (
                <div className='mt-10'>
                  <TodosTable todos={filter != null ? filteredTodos : todos} />
                </div>
              ) : (
                  <p className='text-white mt-10'>You don't have any todos, start adding todos</p>
              )
            }
            <Link to={'/todos/add'} className="bg-sky-600 p-2 rounded-lg shadow-lg hover:bg-sky-800 text-white font-bold ease-out duration-300">Add New Todo<i className="ml-2 fa-solid fa-circle-plus mt-10"></i></Link>
          </div>
      </div>
    </div>
  )
}

export default Dashboard