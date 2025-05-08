import paymentService from "../services/payment.service.js";
import Payment from '../models/payment.model.js';
import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';

// Get payments by user ID
export const getPaymentsByUserId = async (req, res) => {
  const { userId } = req.params; // Get userId from URL parameter
  try {
    // Fetch all bookings associated with this user, including payments
    const payments = await Payment.findAll({
      include: [
        {
          model: Booking,
          where: { user_id: userId }, // Filter bookings by user_id
          include: [
            {
              model: User,
              attributes: ['id', 'username', 'email'], // Add user information if needed
            }
          ],
        },
      ],
    });

    if (!payments.length) {
      return res.status(404).json({ error: "No payments found for this user" });
    }

    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Other controller functions remain unchanged


// Get a payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { booking_id, amount, payment_method, status } = req.body;

    // Check if the booking exists
    const booking = await Booking.findByPk(booking_id);
    if (!booking) {
      return res.status(400).json({ error: "Booking not found for this payment" });
    }

    // Proceed to create payment if booking exists
    const newPayment = await Payment.create({
      booking_id,
      amount,
      payment_method,
      status,
    });

    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing payment
export const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await paymentService.updatePayment(req.params.id, req.body);
    if (!updatedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(200).json(updatedPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const getAllPayments = async (_req, res) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Delete a payment
export const deletePayment = async (req, res) => {
  try {
    await paymentService.deletePayment(req.params.id);
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
