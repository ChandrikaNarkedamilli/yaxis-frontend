"use client";

import './NavBar.css';
import Link from 'next/link';
import { useAuth } from "../../AuthContext";
import { useRouter } from 'next/navigation';
import { BiLogoVisa } from "react-icons/bi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login'); // redirect to login after logout
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/"><BiLogoVisa fontSize="80px"/></Link>
      </div>
      <div className="navbar-links">
        <Link href="/">HOME</Link>
        <Link href="/services">SERVICES</Link>

        {!user && <Link href="/login">LOGIN</Link>}
        {!user && <Link href="/register">REGISTER</Link>}

        {user && <Link href="/profile">PROFILE</Link>}
        {user && <Link href="/cart">CART</Link>}

        {user && <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>}
      </div>
    </nav>
  );
};

export default Navbar;
