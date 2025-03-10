import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserProfile from './pages/UserProfile'
import Layout from './components/layout'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/:username' element={<Layout><UserProfile /></Layout>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
