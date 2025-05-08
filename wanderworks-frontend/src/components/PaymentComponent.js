import React, { useEffect, useState } from 'react';
import './navbar.css'
const PaymentsComponent = ({ userInfo }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        if (userInfo) {
          console.log('userInfo:', userInfo.user.id);
          const response = await fetch(`http://localhost:4000/api/payments/user/${userInfo.user.id}`);
          
          console.log(response.status);
          if (!response.ok) throw new Error('Failed to fetch payments');
          const data = await response.json();
          setPayments(data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch payments.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userInfo]);

  if (loading) return <div>Loading your payments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="payments-table">
      {payments.length === 0 ? (
        <p>You have no past payments.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.booking_id}</td>
                <td>₹{payment.amount}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.status}</td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentsComponent;
