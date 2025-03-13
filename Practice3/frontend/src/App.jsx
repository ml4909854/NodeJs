import React from 'react'
import { BrowserRouter, Route , Routes  } from 'react-router-dom'
import Home from './Component/Home'
import Blog from './Component/Blog'
import CreateBlog from './Component/CreateBlog'
import Myblog from './Component/Myblog'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Navbar from './Navbar/Navbar'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blogs' element={<Blog/>}/>
        <Route path='/create' element={<CreateBlog/>}/>
        <Route path='/myblog' element={<Myblog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App