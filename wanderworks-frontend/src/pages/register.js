import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks
import { register } from '../redux/actions/userActions'; // Import register action
import { useNavigate } from 'react-router-dom';
import '../pages/Login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.user); // Get state from Redux
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password)); // Dispatch the register action
  };

  // If user is already logged in, redirect to home page
  if (userInfo) {
    navigate('/'); // Redirect to homepage if the user is logged in
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Use username instead of name
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {userInfo && <p className="success">Registration successful!</p>}
    </div>
  );
};

export default Register;
