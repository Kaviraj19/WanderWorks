import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeBooking } from '../redux/actions/bookingActions';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getWorkspaceById } from '../services/workspaceService'; // Import workspace fetching
import './Bookings.css'
const Bookings = () => {
  const { id: workspaceId } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.booking || {});

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bookingType, setBookingType] = useState('day_pass');
  const [totalCost, setTotalCost] = useState(0);
  const [numDays, setNumDays] = useState(0);
  const [workspace, setWorkspace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const data = await getWorkspaceById(workspaceId);
        setWorkspace(data);
      } catch (error) {
        console.error('Error fetching workspace details:', error);
      }
    };

    fetchWorkspace();
  }, [workspaceId]);

  useEffect(() => {
    if (startTime && endTime && workspace) {
      const start = new Date(startTime);
      const end = new Date(endTime);

      // Calculate the number of days
      const diffTime = Math.abs(end - start);
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // rounding up

      setNumDays(days);

      // Now, cost calculation logic
      if (days <= 30) {
        setBookingType('day_pass'); // force to day_pass
        const cost = days * workspace.rate_day_pass;
        setTotalCost(cost);
      } else {
        setBookingType('long_term'); // force to long_term
        const fullMonths = Math.floor(days / 30);
        const remainingDays = days % 30;

        const cost = (fullMonths * workspace.rate_long_term) + (remainingDays * workspace.rate_day_pass);
        setTotalCost(cost);
      }
    }
  }, [startTime, endTime, workspace]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInfo) {
      alert('You must be logged in to book a workspace.');
      return;
    }
     
    const bookingData = {
      user_id: userInfo.user?.id || userInfo.id,
      workspace_id: parseInt(workspaceId),
      start_time: new Date(startTime).toISOString(),
      end_time: new Date(endTime).toISOString(),
      booking_type: bookingType,
      total_cost: totalCost,
      status: 'pending',
    };

    dispatch(makeBooking(bookingData));
    alert('Booking request sent!');
    navigate(`/Profile`); // Redirect to profile after booking
  };

  if (!workspace) return <div>Loading workspace details...</div>;

  return (
    <div className="booking-form">
      <h2>Book Workspace: {workspace.name}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        {/* Showing calculated number of days */}
        {numDays > 0 && (
  <div className="cost-breakdown">
    <p><strong>Booking Duration:</strong> {numDays} day(s)</p>

    {numDays <= 30 ? (
      <p>
        <strong>Calculation:</strong> {numDays} day(s) × ₹{workspace.rate_day_pass} = ₹{numDays * workspace.rate_day_pass}
      </p>
    ) : (
      <>
        <p>
          <strong>Calculation:</strong><br />
          {Math.floor(numDays / 30)} month(s) × ₹{workspace.rate_long_term} = ₹{Math.floor(numDays / 30) * workspace.rate_long_term}<br />
          {numDays % 30} extra day(s) × ₹{workspace.rate_day_pass} = ₹{(numDays % 30) * workspace.rate_day_pass}
        </p>
        <p><strong>Total:</strong> ₹{totalCost}</p>
      </>
    )}
  </div>
)}


        {/* Booking Type (calculated automatically) */}
        <div className='cost-breakdown'>
        <div>
          <p><strong>Booking Type:</strong> {bookingType === 'day_pass' ? 'Day Pass' : 'Long Term'}</p>
        </div>

        {/* Showing total cost */}
        <div>
          <p><strong>Total Cost:</strong> ₹{totalCost}</p>
        </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Bookings;
