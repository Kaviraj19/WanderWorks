const initialState = {
    loading: false,
    bookings: [],
    error: null,
  };
  
  export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'BOOKING_LIST_REQUEST':
        return { ...state, loading: true };
      case 'BOOKING_LIST_SUCCESS':
        return { loading: false, bookings: action.payload, error: null };
      case 'BOOKING_LIST_FAIL':
        return { loading: false, bookings: [], error: action.payload };
  
      case 'BOOKING_CREATE_REQUEST':
        return { ...state, loading: true };
      case 'BOOKING_CREATE_SUCCESS':
        return { ...state, loading: false, bookings: [...state.bookings, action.payload] };
      case 'BOOKING_CREATE_FAIL':
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  