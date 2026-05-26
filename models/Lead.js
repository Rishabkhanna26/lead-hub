import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    source: {
      type: String,
      default: 'Referral',
    },
    status: {
      type: String,
      default: 'New',
    },
    priority: {
      type: String,
      default: 'Medium',
    },
    value: {
      type: Number,
      default: 0,
    },
    workedBy: {
      type: String,
      default: 'Not selected',
    },
    lockedBy: {
      type: String,
      default: 'Not selected',
    },
    requirement: {
      type: String,
    },
  },
  { timestamps: true }
);

// We define a model only if it hasn't been compiled yet (for Next.js HMR)
export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
