import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    client: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    method: {
      type: String,
      default: 'Bank Transfer',
    },
    workedBy: {
      type: String,
    },
    lockedBy: {
      type: String,
    },
    status: {
      type: String,
      default: 'Completed',
    },
    reference: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
