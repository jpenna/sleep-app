import { SleepRecordType, IApolloContent } from 'src/types';
import { AssertionError } from 'assert';

export default {
  Query: {
    sleepRecord(startTime: string) {
      return {startTime: 123412312, endTime: 12341234 }
    },

    sleepList(_: any, __: any, { dataSources, user }: IApolloContent) {
      return dataSources.userData.getSleepLog();
    },
  },

  Mutation: {
    async updateSleep(_: any, { startTime, endTime }: SleepRecordType, { dataSources, user }: IApolloContent) {
      try {
        if (startTime >= endTime) throw new Error('Start time should be before end time.');
        const userObj = await dataSources.userData.updateSleepRecord(user.email, { startTime, endTime });
        const sleepRecord = userObj.sleepLog[0];
        return {
          success: true,
          error: null,
          sleepRecord,
        };
      } catch(err) {
        return {
          success: false,
          error: err.message,
          sleepRecord: null,
        };
      }
    },

    removeSleep() {

    }
  }
};
