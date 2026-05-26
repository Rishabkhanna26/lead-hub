import mongoose from 'mongoose';

const MeetingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    participants: {
      type: String,
    },
    status: {
      type: String,
      default: 'Scheduled',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Meeting || mongoose.model('Meeting', MeetingSchema);
