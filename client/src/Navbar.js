import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to="/admin">Admin</Link>
        <Link to="/user">User</Link>
    </div>
    
  )
}

export default Navbar