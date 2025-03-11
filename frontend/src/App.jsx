import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserProfile from './pages/UserProfile'
import Layout from './components/layout'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import SetPage from './pages/SetPage'


function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/:username' element={<Layout><PrivateRoute><UserProfile /></PrivateRoute></Layout>} />
            <Route path='/home' element={<Layout><PrivateRoute><Home /></PrivateRoute></Layout>} />
            <Route path='/sets/:num_set' element={<Layout><PrivateRoute><SetPage /></PrivateRoute></Layout>} />

            <Route path='/login' element={<Layout><Login /></Layout>} />
            <Route path='/register' element={<Layout><Register /></Layout>} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
