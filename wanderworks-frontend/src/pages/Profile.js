// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserBookings } from '../services/bookingService'; // You need to create this service
import BookingsComponent from '../components/BookingsComponent'; // Import the BookingsComponent
import PaymentsComponent from '../components/PaymentComponent'; // Import the PaymentsComponent
import './Profile.css'; // New CSS file matching your dark theme

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings'); // State for tab toggle

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userInfo) {
        setError('User info is not available');
        setLoading(false);
        return;
      }

      try {
        const data = await getUserBookings(userInfo.id || userInfo.user?.id);
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userInfo]);

  const handlePay = (bookingId, amount) => {
    const options = {
      key: 'rzp_test_WlpS33JDzWa9sa', // Replace with your Key ID
      amount: amount * 100, // paise (₹500 = 50000 paise)
      currency: 'INR',
      name: 'Workspace Booking',
      description: 'Payment for your booking',
      handler: async function (response) {
        // This function runs after successful payment
        console.log('Payment Success:', response);
  
        try {
          const paymentData = {
            booking_id: bookingId,
            amount: amount,
            payment_method: 'Razorpay',
            status: 'completed',
            createdAt: new Date().toISOString(),  // Set dynamic createdAt timestamp
            updatedAt: new Date().toISOString(),  // Set dynamic updatedAt timestamp
          };
  
          // First, record the payment
          const paymentRes = await fetch('http://localhost:4000/api/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });
  
          if (!paymentRes.ok) throw new Error('Failed to record payment');
  
          // After successful payment, update booking status to "Completed"
          const bookingUpdateData = {
            status: 'Completed',
          };
  
          const bookingRes = await fetch(`http://localhost:4000/api/bookings/${bookingId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingUpdateData),
          });
  
          if (!bookingRes.ok) throw new Error('Failed to update booking status');
          const data = await getUserBookings(userInfo.id || userInfo.user?.id);
          setBookings(data);
  
          alert('✅ Payment successful & booking status updated to "Completed"!');

        } catch (error) {
          console.error(error);
          alert('Payment done, but recording or status update failed.');
        }
      },
      prefill: {
        name: userInfo.user?.username || userInfo?.name,
        email: userInfo.user?.email,
      },
      theme: {
        color: '#0b5ed7',
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <div>Loading your profile...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-page">
      <h2>Welcome, {userInfo.user?.username || userInfo?.name || 'User'}</h2>

      <div className="user-info">
        <p><strong>Email:</strong> {userInfo.user?.email}</p>
        <p><strong>User ID:</strong> {userInfo?.id || userInfo?.user?.id}</p>
      </div>

      {/* Toggle buttons for Bookings and Payments */}
      <div className="toggle-buttons">
        <button onClick={() => setActiveTab('bookings')} className={activeTab === 'bookings' ? 'active' : ''}>
          My Bookings
        </button>
        <button onClick={() => setActiveTab('payments')} className={activeTab === 'payments' ? 'active' : ''}>
          My Past Payments
        </button>
      </div>

      {/* Render the active tab content */}
      {activeTab === 'bookings' && <BookingsComponent userInfo={userInfo} bookings={bookings} handlePay={handlePay} />}
      {activeTab === 'payments' && <PaymentsComponent userInfo={userInfo} />}
    </div>
  );
};

export default Profile;
