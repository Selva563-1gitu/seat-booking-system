import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/react-app-demo"><h2 className="logo">MyApp</h2></Link>
      <ul className="nav-links">
        <li><Link to="/react-app-demo/profile">Profile</Link></li>
        {/* <li><Link to="/react-app-demo/bookings">Bookings</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
