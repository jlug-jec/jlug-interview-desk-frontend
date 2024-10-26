import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Nav from './Nav.jsx'
import './index.css'
import {  BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import Dashboard from './pages/dashboard.jsx'
import Add_task from './pages/add.jsx'
import Task from './pages/task.jsx'
import Bookmark from './pages/bookmark.jsx'
import Review from './pages/review.jsx'
import User from './pages/User.jsx'
import Register from './pages/Register.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Login from './pages/Login.jsx'
import Udashboard from './pages/User/dashboard.jsx'
import Nav1 from './Nav1.jsx'
import View from './pages/User/View.jsx'
import Tasks from './pages/User/Tasks.jsx'
import Chat from './pages/User/Chat.jsx'
import Prof from './pages/User/Prof.jsx'

const Main = ()=>{
  const loc = useLocation();
  const styles = 'ml-[70px] mt-[64px]'
  const userp = loc.pathname.startsWith('/userd');

  return(
    <div className= {`${loc.pathname === '/register' || loc.pathname === '/login' ? '' : styles}`}>
      {loc.pathname !== '/register' && loc.pathname !== '/login' && !userp && <Nav />}
      {userp && <Nav1 />}
      <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/add" element={<Add_task />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/book" element={<Bookmark />} />
            <Route path="/review" element={<Review />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />} />
            <Route path="/leader" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userd" element={<Udashboard />} />
            <Route path="/userd/tasks" element={<Tasks />} />
            <Route path="/userd/view" element={<View />} />
            <Route path="/userd/chat" element={<Chat />} />
            <Route path="/userd/user" element={<Prof />} />
      </Routes>
    </div>
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Router>
          <Main />
        </Router>
  </StrictMode>
)
