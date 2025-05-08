// routes/payment.routes.js
import express from 'express';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware.js';
import { 
  getAllPayments, 
  getPaymentById, 
  createPayment, 
  updatePayment, 
  getPaymentsByUserId,
  deletePayment 
} from '../controllers/payment.controller.js';  // Import specific controller functions

const router = express.Router();

router.get('/user/:userId', getPaymentsByUserId);

// Protected route for getting all payments (Admin only)
router.get('/', authenticateToken, isAdmin, getAllPayments);

// Get payment by ID
router.get('/:id', getPaymentById);

// Create a new payment
router.post('/', createPayment);

// Update an existing payment (Admin only)
router.put('/:id', authenticateToken, isAdmin, updatePayment);

// Delete a payment (Admin only)
router.delete('/:id', authenticateToken, isAdmin, deletePayment);

export default router;
