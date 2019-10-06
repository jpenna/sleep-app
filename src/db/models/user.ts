import { updateSleepLogParamsType, IUser, IUserSchema } from 'src/types';
import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new mongoose.Schema({
  id: String,
  email: { type: String, unique: true },
  sleepLog: [{
    startTime: { type: String, required: true },
    endTime: { type: String },
  }],
});

userSchema.index({ email: 1, 'sleepLog.startTime': -1 }, { unique: true });

userSchema.statics.updateSleepLog = function({ email, startTime, endTime }: updateSleepLogParamsType): IUser | null {
  return this.findOne({ email },
    {
      $push: {
        sleepLog: { startTime, endTime },
      },
    },
    { new: true }
  )
  .catch((err: Error) => {
    console.error(err);
    return null;
  });
}

export default mongoose.model<IUser, IUserSchema>('User', userSchema);
