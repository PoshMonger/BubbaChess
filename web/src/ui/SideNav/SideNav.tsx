import React from 'react'
import { Link } from 'react-router-dom'
import './SideNav.css'
type Props = {}

const SideNav = (props: Props) => {
  return (
    <div className="side-nav">
        <div className="side-nav-item">
            <Link to="/">Home</Link>
        </div>
        <div className="side-nav-item">
            <Link to="/login">Login</Link>
        </div>
        <div className="side-nav-item">
            <Link to="/w">Games</Link>
        </div>
        <div className="side-nav-item">
            <Link to="/">Profile</Link>
        </div>
        <div className="side-nav-item">
            <Link to="/">Settings</Link>
        </div>
        <div className="side-nav-item">
            <Link to="/">Logout</Link>
        </div>
        <div className="side-nav-item">
            <Link to="/">Help</Link>
        </div>
    </div>
  )
}

export default SideNav