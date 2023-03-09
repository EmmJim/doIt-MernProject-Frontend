import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthProvider';

//Components
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<ProtectedRoute />}>
              <Route index element={<Dashboard />}/>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
