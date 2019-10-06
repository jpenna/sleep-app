import { updateSleepLogParamsType, IUser, IUserSchema } from 'src/types';
import mongoose, { Schema } from 'mongoose';
import { MongoError } from 'mongodb';

const userSchema: Schema = new mongoose.Schema({
  id: String,
  email: { type: String, unique: true },
  sleepLog: [{
    startTime: { type: Date, required: true },
    endTime: { type: Date },
  }],
});

userSchema.index({ email: 1, 'sleepLog.startTime': 1, 'sleepLog.endTime': 1 });
userSchema.index({ email: 1, 'sleepLog.endTime': 1 });

userSchema.statics.updateSleepLog = async function(
  { email, startTime, endTime }: updateSleepLogParamsType
): Promise<IUser | null> {
  const recorded = await this.findOne({
    email,
    sleepLog: {
      $elemMatch: {
        $or: [
          // Before starting a new record, a pending one has to be finished
          { 'startTime': { $ne: startTime }, 'endTime': null },
          // Can't have a record overlapping a previous record
          { 'startTime': { $lte: startTime }, 'endTime': { $gte: startTime } },
          { 'startTime': { $lte: endTime }, 'endTime': { $gte: endTime } },
          // Can't have a record containing a previous record
          { 'startTime': { $gt: startTime, $lt: endTime } },
          { 'endTime': { $gt: startTime, $lte: endTime } },
        ],
      },
    },
  }, 'sleepLog.$');

  if (recorded) {
    const { startTime, endTime } = recorded.sleepLog[0];
    if (!endTime) throw new MongoError(`You have a pending record which started at ${startTime}. Please, finish it first.`);
    throw new MongoError(`You were sleeping at this time from ${startTime} to ${endTime}.`);
  }

  const _id = mongoose.Types.ObjectId();

  return this.findOneAndUpdate(
    email,
    {
      $push: {
        sleepLog: { _id, startTime, endTime },
      },
    },
    { new: true, projection: { 'sleepLog': { $elemMatch: { _id } } } }
  );
}

export default mongoose.model<IUser, IUserSchema>('User', userSchema);
