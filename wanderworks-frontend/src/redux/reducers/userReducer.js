const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    loading: false,
    error: null,
  };
  
  // Reducer function for login and register actions
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
      case 'REGISTER_REQUEST':
        return { ...state, loading: true, error: null };
  
      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
        return { ...state, loading: false, userInfo: action.payload };
  
      case 'LOGIN_FAILURE':
      case 'REGISTER_FAILURE':
        return { ...state, loading: false, error: action.payload };
  
      case 'LOGOUT':
        return { ...state, userInfo: null };
  
      default:
        return state;
    }
  };
  