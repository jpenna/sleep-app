import { UpdateSleepLogParamsType, GetSleepLogParamsType, IUser, IUserSchema } from 'src/types';
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
  { email, startTime, endTime }: UpdateSleepLogParamsType
): Promise<IUser['sleepLog']> {
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
          { 'endTime': { $gt: startTime, $lt: endTime } },
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
        sleepLog: {
          $each: [{ _id, startTime, endTime }],
          $sort: { startTime: 1 },
        },
      },
    },
    { new: true, projection: { 'sleepLog': { $elemMatch: { _id } } } }
  );
}

userSchema.statics.getSleepLog = function(
  { email, from, to }: GetSleepLogParamsType
): Promise<{ sleepLog: IUser['sleepLog'] }> {
  const today = new Date();
  const filter: { $gte: number, $lte?: number } = {
    $gte: from || today.setDate(today.getDate() - 7),
  };
  if (to) filter.$lte = to;

  return this.findOne({
    email,
    sleepLog: {
      $elemMatch: { 'startTime': filter },
    },
  },
  'sleepLog');
}

export default mongoose.model<IUser, IUserSchema>('User', userSchema);
