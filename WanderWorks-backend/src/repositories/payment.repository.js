import Payment from '../models/payment.model.js';
import Booking from '../models/booking.model.js';  // Include Booking model to join

class PaymentRepository {
  // Get all payments
  async findAll() {
    return await Payment.findAll();
  }

  // Get a payment by ID
  async findById(id) {
    return await Payment.findByPk(id);
  }

  // Get payments by user ID
  async findByUserId(userId) {
    return await Payment.findAll({
      include: {
        model: Booking,
        where: { user_id: userId },
        attributes: [], // You don't need to fetch booking attributes here
      },
    });
  }

  // Create a new payment
  async create(paymentData) {
    return await Payment.create(paymentData);
  }

  // Update an existing payment
  async update(id, paymentData) {
    return await Payment.update(paymentData, { where: { id } });
  }

  // Delete a payment
  async delete(id) {
    return await Payment.destroy({ where: { id } });
  }
}

export default new PaymentRepository();
