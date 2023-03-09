import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import Navbar from './Navbar'

const Dashboard = () => {

  const {auth} = useAuth();

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async() => {
      const result = await fetch(`http://localhost:4000/api/todos`);
      const data = await result.json();

      const todosByUser = data.todos.filter((todo) => todo.userId === auth.user._id);

      setTodos(todosByUser);
    }

    getTodos();
  }, [todos])
  

  const handleToggleStatus = async (id, status) => {
    console.log(id)
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: 'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({status: !status})
      })
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='mt-10 w-3/4 mx-auto space-y-10'>
          <h1 className='font-bold text-4xl text-white'>Welcome {auth.user.name}!</h1>
          <div className=''>
            <h2 className='text-white font-bold text-2xl titulo'>Your Todos</h2>
            {
              todos.length ? (
                <div className='mt-10'>
                  <div className="table text-center bg-white rounded-lg p-5 w-full">
                    <div div className="table-header-group bg-indigo-600 text-white">
                      <div className="table-row">
                        <div className="table-cell w-2/12 font-bold p-2">Todo</div>
                        <div className="table-cell w-5/12 font-bold p-2">Description</div>
                        <div className="table-cell w-2/12 font-bold p-2">Status</div>
                        <div className="table-cell w-3/12 font-bold p-2">Actions</div>
                      </div>
                    </div>
                    {todos.map((todo) => (
                        <div className="table-row-group" key={todo._id}>
                          <div className="table-row">
                            <div className="table-cell p-2">
                              <p>{todo.title}</p>
                            </div>
                            <div className="table-cell p-2">
                              <p>{todo.description}</p>
                            </div>
                            <div className="table-cell p-1">
                              <button className={`${todo.status ? 'bg-green-600' : 'bg-red-600'} w-1/2 p-1 rounded-md text-white font-bold`} onClick={() => handleToggleStatus(todo._id, todo.status)}>{todo.status ? 'Done' : 'To Do'}</button>
                            </div>
                            <div className="table-cell p-1 space-x-3">
                              <button className='bg-cyan-600 w-1/4 p-1 rounded-md text-white font-bold' onClick={() => {}}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button className='bg-red-600 w-1/4 p-1 rounded-md text-white font-bold'onClick={() => {}}>
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          
                        </div>
                      
                    ))}
                  </div>
                </div>
              ) : (
                <p>You don't have any todos, start adding todos</p>
              )
            }
            
          </div>
      </div>
    </div>
  )
}

export default Dashboard