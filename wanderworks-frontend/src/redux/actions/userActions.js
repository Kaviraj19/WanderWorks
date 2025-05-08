import { loginUser, registerUser } from '../../services/userService'; // Import service functions

// Login action
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const data = await loginUser(email, password); // Call login API
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    
    // Store user info (including token) in localStorage
    localStorage.setItem('userInfo', JSON.stringify(data)); 
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo'); // Remove user info from localStorage
  dispatch({ type: 'LOGOUT' });
};

// Register action
export const register = (username, email, password) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
    const data = await registerUser(username, email, password); // Call register API
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    
    // Store user info (including token) in localStorage
    localStorage.setItem('userInfo', JSON.stringify(data)); 
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
  }
};
