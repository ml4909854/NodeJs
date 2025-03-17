import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='container'>
        <Link className='link' to="/">Home</Link>
        <Link className='link' to="/blogs">Blog</Link>
        <Link className='link' to="/create">Create</Link>
        <Link className='link' to="/myblog">Myblog</Link>
        <Link className='link' to="/login">Login</Link>
        <Link className='link' to="/signin">singin</Link>
    </div>
  )
}

export default Navbar