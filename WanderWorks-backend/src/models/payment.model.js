import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Booking from './booking.model.js';

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  booking_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  payment_method: { type: DataTypes.STRING, allowNull: false }, // Example: 'credit card', 'paypal'
  status: { type: DataTypes.STRING, defaultValue: 'pending' }, // Example: 'pending', 'completed'
});

Payment.belongsTo(Booking, { foreignKey: 'booking_id' });


export default Payment;
