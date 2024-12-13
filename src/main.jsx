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
import EditTask from './pages/edittask.jsx'
import Settings from './pages/Settings.jsx'
import Reset from './pages/Reset.jsx'
import { AdminProvider } from './contexts/Admin.jsx'
import { UserProvider } from './contexts/User.jsx'

const Main = ()=>{
  const loc = useLocation();
  const styles = 'md:ml-[70px] md:mt-[64px] mt-[60px]'
  const userp = loc.pathname.startsWith('/userd');

  return(
    <div className= {`${loc.pathname === '/register' || loc.pathname === '/login' || loc.pathname === '/reset' ? '' : styles}`}>
      {loc.pathname !== '/register' && loc.pathname !== '/login' && loc.pathname !== '/reset' && !userp && <Nav />}
      {userp && <Nav1 />}
      <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/add" element={<Add_task />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/book" element={<Bookmark />} />
            <Route path="/review" element={<Review />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/leader" element={<Leaderboard />} />
            <Route path="https://jlug-interview-desk-frontend.vercel.app/login" element={<Login />} />
            <Route path="/userd" element={<Udashboard />} />
            <Route path="/userd/tasks" element={<Tasks />} />
            <Route path="/userd/view/:id" element={<View />} />
            <Route path="/userd/chat" element={<Chat />} />
            <Route path="/userd/user/" element={<Prof />} />
            <Route path="/edittask/:id" element={<EditTask />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Router>
          
        <AdminProvider>
          <UserProvider>
          <Main />
          </UserProvider>
          </AdminProvider>
        </Router>
  </StrictMode>
)
