import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

//Components
import TodoRow from './TodoRow'

const TodosTable = ({todos}) => {

    const navigate = useNavigate();

    const handleToggleStatus = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-token': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({status: !status})
            })
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteTodo = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'x-token': `${localStorage.getItem('token')}`
                        }
                    })
                    const data = await response.json();
                    Swal.fire(
                        'Deleted!',
                        'Your todo has been deleted.',
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                    Swal.fire(
                        'Error!',
                        'Something went wrong, try again',
                        'error'
                    )
                }
                
            }
        })
        
    }

    return (
        <div className="table text-center bg-white rounded-lg p-5 w-full">
            <div className="table-header-group bg-indigo-600 text-white">
                <div className="table-row">
                <div className="table-cell w-2/12 font-bold p-2">Todo</div>
                <div className="table-cell w-5/12 font-bold p-2">Description</div>
                <div className="table-cell w-2/12 font-bold p-2">Status</div>
                <div className="table-cell w-3/12 font-bold p-2">Actions</div>
                </div>
            </div>
            {todos.length ? todos.map((todo) => (
                <TodoRow key={todo._id} todo={todo} handleToggleStatus={handleToggleStatus} handleDeleteTodo={handleDeleteTodo}/>
            )) : (
                <p className='text-center mt-3'>Theres no to do's in this section</p>
            )}
        </div>
    )
}

export default TodosTable