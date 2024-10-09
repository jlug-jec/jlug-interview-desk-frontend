import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Nav from './Nav.jsx'
import {  BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Add_task from './pages/add'
import Task from './pages/task'
import Bookmark from './pages/bookmark'
import Review from './pages/review'
import User from './pages/User.jsx'
import Register from './pages/Register'
import Leaderboard from './pages/Leaderboard.jsx'

const Main = ()=>{
  const loc = useLocation();
  const styles = 'ml-[70px] mt-[64px]'
  return(
    <div className= {`${loc.pathname === '/register' ? '' : styles}`}>
      {loc.pathname !== '/register' && <Nav />}
      <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<Add_task />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/book" element={<Bookmark />} />
            <Route path="/review" element={<Review />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />} />
            <Route path="/leader" element={<Leaderboard />} />
      </Routes>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Main />
    </Router>
  </StrictMode>,
)
