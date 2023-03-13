import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Providers
import {AuthProvider} from './context/AuthProvider';

//Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import NewTodo from './pages/NewTodo';
import EditTodo from './pages/EditTodo';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
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
              <Route path='*' element={<NotFound />}/>
            </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
