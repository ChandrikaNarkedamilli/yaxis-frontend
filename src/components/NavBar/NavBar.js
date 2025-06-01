"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "./NavBar.css" 
import { BiLogoVisa } from "react-icons/bi";


const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/"><BiLogoVisa fontSize="80px"/></Link>
      </div>
      <div className="navbar-links">
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/profile">Profile</Link>
          {/* <button onClick={handleLogout} className="btn btn-danger">Logout</button> */}
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
      </div>
    </nav>
  )
}

export default NavBar