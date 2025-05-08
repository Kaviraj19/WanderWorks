import { jsPDF } from "jspdf";
import { useState } from "react";

const BookingsComponent = ({ userInfo, bookings, handlePay }) => {
  const [statusFilter, setStatusFilter] = useState('all'); // New state to manage filter

  // Filter bookings based on the selected status
  const filteredBookings = bookings.filter((booking) => {
    if (statusFilter === 'all') return true;
    return booking.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const generatePDF = (booking) => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text("Booking Ticket", 20, 20);

      doc.setFontSize(12);
      doc.text(`Workspace: ${booking.workspace_name}`, 20, 40);
      doc.text(`Start Time: ${new Intl.DateTimeFormat('en-US', { 
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', 
        hour: 'numeric', minute: 'numeric', second: 'numeric' 
      }).format(new Date(booking.start_time))}`, 20, 50);
      doc.text(`End Time: ${new Intl.DateTimeFormat('en-US', { 
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', 
        hour: 'numeric', minute: 'numeric', second: 'numeric' 
      }).format(new Date(booking.end_time))}`, 20, 60);
      doc.text(`Booking Type: ${booking.booking_type}`, 20, 70);
      doc.text(`Total Cost: ₹${booking.total_cost}`, 20, 80);
      doc.text(`Status: ${booking.status}`, 20, 90);

      doc.save(`Booking_Ticket_${booking.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF.");
    }
  };

  return (
    <div className="bookings-list">
      {/* Filter UI */}
      <div className="filter-container">
        <label htmlFor="status-filter" className="filter-label">Filter by Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>Workspace</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Booking Type</th>
            <th>Total Cost</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.workspace_name}</td>
                <td>{new Date(booking.start_time).toLocaleString()}</td>
                <td>{new Date(booking.end_time).toLocaleString()}</td>
                <td>{booking.booking_type}</td>
                <td>₹{booking.total_cost}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === 'pending' && (
                    <button onClick={() => handlePay(booking.id, booking.total_cost)} className="btn btn-success">
                      Pay Now
                    </button>
                  )}
                  {booking.status === 'Completed' && (
                    <button onClick={() => generatePDF(booking)} className="btn btn-primary">
                      Generate Ticket
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsComponent;
