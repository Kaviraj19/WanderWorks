import bookingRepo from "../repositories/booking.repository.js";
import workspaceRepo from "../repositories/workspace.repository.js"; // You need this

class BookingService {
  async getAllBookings() {
    return await bookingRepo.findAll();
  }
  async getBookingsByUserId(userId) {
    const bookings = await bookingRepo.findByUserId(userId);
  
    // Map and format
    return bookings.map(booking => ({
      id: booking.id,
      start_time: booking.start_time,
      end_time: booking.end_time,
      booking_type: booking.booking_type,
      total_cost: booking.total_cost,
      status: booking.status,
      username: booking.User ? booking.User.username : 'N/A', // Ensure User is included
      workspace_name: booking.Workspace ? booking.Workspace.name : 'N/A', // Ensure Workspace is included
    }));
  }

  async getBookingById(id) {
    return await bookingRepo.findById(id);
  }

  async createBooking(bookingData) {
    const { workspace_id, start_time, end_time, booking_type } = bookingData;

    const workspace = await workspaceRepo.findById(workspace_id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }

    const start = new Date(start_time);
    const end = new Date(end_time);

    if (isNaN(start) || isNaN(end) || start >= end) {
      throw new Error("Invalid start or end time");
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    let totalCost = 0;

    switch (booking_type) {
      case "day_pass":
        totalCost = workspace.rate_day_pass * days;
        break;

      case "weekly":
        totalCost = workspace.rate_day_pass * days; // optional: apply weekly discounts here
        break;

      case "long_term":
        const months = Math.ceil(days / 30);
        totalCost = workspace.rate_long_term * months;
        break;

      default:
        throw new Error("Invalid booking type");
    }

    // Final data to save
    const bookingToCreate = {
      ...bookingData,
      total_cost: totalCost,
    };

    return await bookingRepo.create(bookingToCreate);
  }

  async updateBooking(id, bookingData) {
    return await bookingRepo.update(id, bookingData);
  }

  async deleteBooking(id) {
    return await bookingRepo.delete(id);
  }
}

export default new BookingService();
