import React from 'react'
import Dashboard from './pages/dashboard'
import Add_task from './pages/add'
import Task from './pages/task'
import Bookmark from './pages/bookmark'
import Review from './pages/review'
import {  BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Dashboard />} path='/'></Route>
        <Route element={<Add_task />} path='/add'></Route>
        <Route element={<Task />} path='/tasks'></Route>
        <Route element={<Bookmark />} path='/book'></Route>
        <Route element={<Review />} path='/review'></Route>
      </Routes>
    </Router>
   
  
  )
}

export default App