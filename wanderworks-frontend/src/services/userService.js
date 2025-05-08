import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

// Login user
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API}/users/login`, { email, password });
  return res.data;
};

// Register user
export const registerUser = async (username, email, password) => {
  const res = await axios.post(`${API}/users/register`, { username, email, password });
  return res.data;
};
