import { UpdateSleepLogParamsType, GetSleepLogParamsType, IUser, IUserSchema, SleepRecordType } from 'src/types';
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
): Promise<SleepRecordType> {
  const recorded = await this.findOne({
    email,
    sleepLog: {
      $elemMatch: {
        $or: [
          // Before starting a new record, a pending one has to be finished
          { 'endTime': null },
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
    const { _id, startTime: recStartTime, endTime: recEndTime } = recorded.sleepLog[0];

    if (!recEndTime) {
      if (recStartTime.getTime() - startTime.getTime() !== 0) throw new MongoError(`You have a pending record, please finish it first. Start time: ${recStartTime.getTime()}`);
      const updated = await this.findOneAndUpdate({
        email,
        sleepLog: { $elemMatch: { _id } },
      }, {
        $set: { 'sleepLog.$.endTime': endTime }
      }, { new: true, projection: { 'sleepLog': { $elemMatch: { _id } } } });
      return updated.sleepLog[0];
    }

    throw new MongoError(`You were sleeping at this time from ${recStartTime} to ${recEndTime}.`);
  }

  const _id = mongoose.Types.ObjectId();

  const userObj = await this.findOneAndUpdate(
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

  return userObj.sleepLog[0];
}

userSchema.statics.getSleepLog = async function(
  { email, from, to }: GetSleepLogParamsType
): Promise<{ sleepLog: IUser['sleepLog'] }> {
  const today = new Date();
  const filter: { $gte: Date, $lte?: Date } = {
    $gte: from || today.setDate(today.getDate() - 7),
  };
  if (to) filter.$lte = to;

  const userObj = await this.findOne({
    email,
    sleepLog: {
      $elemMatch: { 'startTime': filter },
    },
  },
  'sleepLog');

  return userObj.sleepLog;
}

userSchema.statics.deleteSleepRecord = async function(
  { email, sleepId }: { email: IUser['email'], sleepId: SleepRecordType['_id'] }
): Promise<boolean> {
  const result = await this.findOneAndUpdate({
    email,
    sleepLog: {
      $elemMatch: { '_id': sleepId },
    }
  }, {
    $pull: { 'sleepLog': { '_id': sleepId } }
  });

  return !!result;
}

export default mongoose.model<IUser, IUserSchema>('User', userSchema);
