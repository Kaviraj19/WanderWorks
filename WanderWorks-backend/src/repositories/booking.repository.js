// repositories/booking.repository.js
import User from "../models/user.model.js"; // Import User model
import Workspace from "../models/workspace.model.js"; // Ensure this is imported as well
import Booking from "../models/booking.model.js";

class BookingRepository {
  async findAll() {
    return await Booking.findAll();
  }

  async findByUserId(userId) {
    return await Booking.findAll({
      where: { user_id: userId },
      include: [
        { model: User, attributes: ['username'] }, // Make sure User is included
        { model: Workspace, attributes: ['name'] }, // Make sure Workspace is included
      ],
    });
  }

  async findById(id) {
    return await Booking.findByPk(id);
  }

  async create(bookingData) {
    return await Booking.create(bookingData);
  }

  async update(id, bookingData) {
    return await Booking.update(bookingData, { where: { id } });
  }

  async delete(id) {
    return await Booking.destroy({ where: { id } });
  }
}

export default new BookingRepository();
