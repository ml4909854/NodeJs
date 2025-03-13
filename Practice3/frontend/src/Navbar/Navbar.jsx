import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"
const Navbar = () => {
  return (
    <div className='navbar'>
        <Link className='link' to="/">Home</Link>
        <Link className='link' to="/blogs">Blog</Link>
        <Link className='link' to="/create">CreateBlog</Link>
        <Link className='link' to="/myblog">Myblog</Link>
        <Link className='link' to="/login">Login</Link>
        <Link className='link' to="/sign">Signup</Link>

    </div>
  )
}

export default Navbar