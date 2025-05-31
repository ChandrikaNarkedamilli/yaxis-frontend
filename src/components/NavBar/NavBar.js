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


// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export default function Navbar() {
//   const [token, setToken] = useState(null);
//   const [name, setName] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedName = localStorage.getItem('name');
//     if (storedToken && storedName) {
//       setToken(storedToken);
//       setName(storedName);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('name');
//     setToken(null);
//     setName('');
//     router.push('/login');
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <Link href="/">Visa App</Link>
//       </div>
//       <div className="navbar-links">
//         <Link href="/">Home</Link>
//         <Link href="/services">Services</Link>
//         {token ? (
//           <>
//             <Link href="/cart">Cart</Link>
//             <Link href="/profile">{name}</Link>
//             <button onClick={handleLogout} className="btn btn-danger">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link href="/login">Login</Link>
//             <Link href="/register">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }