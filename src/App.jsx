import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Providers
import {AuthProvider} from './context/AuthProvider';
import TodosProvider from './context/TodosProvider';

//Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import NewTodo from './pages/NewTodo';
import EditTodo from './pages/EditTodo';
import Register from './pages/Register';

function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          {/* <TodosProvider> */}
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<ProtectedRoute />}>
                <Route index element={<Dashboard />}/>
              </Route>
              <Route path='todos' element={<ProtectedRoute />}>
                <Route path='add' element={<NewTodo />}/>
                <Route path=':id' element={<EditTodo />}/>
              </Route>
            </Routes>
          {/* </TodosProvider> */}
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
