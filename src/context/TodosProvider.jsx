import {useState, useEffect, createContext} from 'react';

const TodosContext = createContext();

const TodosProvider = ({children}) => {
    
    const [todos, setTodos] = useState([]);

    console.log(todos)

    return (
        <TodosContext.Provider 
            value={{
                todos,
                setTodos
            }}
        >
            {children}
        </TodosContext.Provider>
    )
}


export {
    TodosProvider
}


export default TodosContext;