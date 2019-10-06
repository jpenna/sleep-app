import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: String,
  email: { type: String, unique: true },
  sleepLog: [{
    startTime: { type: String, required: true },
    endTime: { type: String },
  }],
});

userSchema.index({ email: 1, 'sleepLog.startTime': 1 }, { unique: true });

export default mongoose.model('User', userSchema);
