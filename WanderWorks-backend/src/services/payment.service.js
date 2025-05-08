import paymentRepo from '../repositories/payment.repository.js';

class PaymentService {
  async getAllPayments() {
    return await paymentRepo.findAll();
  }

  async getPaymentById(id) {
    return await paymentRepo.findById(id);
  }

  async createPayment(paymentData) {
    return await paymentRepo.create(paymentData);
  }

  async updatePayment(id, paymentData) {
    return await paymentRepo.update(id, paymentData);
  }

  async deletePayment(id) {
    return await paymentRepo.delete(id);
  }
}

export default new PaymentService();
