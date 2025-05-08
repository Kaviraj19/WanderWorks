import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { FaUserCircle } from 'react-icons/fa'; // Importing user icon from react-icons
import './navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Log the userInfo to check its structure
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">WanderWorks</Link>
      </div>
      <ul className="navbar-nav">
        <li>
          <Link to="/">Home</Link>
        </li>

        {userInfo ? (
          <>
            <li className="user-icon">
            <Link to="/Profile">
              <FaUserCircle size={24} color="#43a047" /></Link>
            </li>
            <li className="username">
              <span>Welcome, {userInfo.username || userInfo.user?.username || 'Guest'}</span>
              {/* Adjust based on the structure of userInfo */}
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
