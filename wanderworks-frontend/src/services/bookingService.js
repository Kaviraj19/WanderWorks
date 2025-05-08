import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

// Get bookings for a user
export const getUserBookings = async (userId) => {
  const res = await axios.get(`${API}/bookings/user/${userId}`);
  return res.data;
};

// Create a new booking
export const createBooking = async (bookingData) => {
  const res = await axios.post(`${API}/bookings`, bookingData);
  return res.data;
};
