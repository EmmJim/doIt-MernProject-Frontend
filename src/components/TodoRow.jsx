import React from 'react'
import { Link } from 'react-router-dom'

const TodoRow = ({todo, handleToggleStatus, handleDeleteTodo}) => {
    return (
        <div className="table-row-group">
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
                <Link className='bg-cyan-600 w-1/4 p-1 inline-block rounded-md text-white font-bold' to={`/todos/${todo._id}`}>
                <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <button className='bg-red-600 w-1/4 p-1 rounded-md text-white font-bold' onClick={() => handleDeleteTodo(todo._id)}>
                <i className="fa-solid fa-trash"></i>
                </button>
            </div>
            </div>
        </div>
    )
}

export default TodoRow