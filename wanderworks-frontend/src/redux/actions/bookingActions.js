import { getUserBookings, createBooking } from '../../services/bookingService';

// Fetch all bookings for logged-in user
export const fetchUserBookings = (userId) => async (dispatch) => {
  try {
    dispatch({ type: 'BOOKING_LIST_REQUEST' });
    const data = await getUserBookings(userId);
    dispatch({ type: 'BOOKING_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'BOOKING_LIST_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create a new booking
export const makeBooking = (bookingData) => async (dispatch) => {
  try {
    dispatch({ type: 'BOOKING_CREATE_REQUEST' });
    const data = await createBooking(bookingData);
    dispatch({ type: 'BOOKING_CREATE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'BOOKING_CREATE_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};
