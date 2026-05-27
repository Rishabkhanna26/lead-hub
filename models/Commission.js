import mongoose from 'mongoose';

const CommissionSchema = new mongoose.Schema(
  {
    client: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    acquirers: [
      {
        member: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    workers: [
      {
        member: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

delete mongoose.models.Commission;
export default mongoose.model('Commission', CommissionSchema);
