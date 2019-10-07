import { SleepRecordType, IApolloContent, GetSleepLogParamsType } from 'src/types';

export default {
  Query: {
    async sleepLog(_: any, { from, to }: GetSleepLogParamsType, { dataSources, user }: IApolloContent) {
      try {
        if (from >= to) throw new Error('`from` value should be before `to` value.');
        const sleepLog = await dataSources.userData.getSleepLog({ email: user.email, from, to });
        console.log(sleepLog)
        return {
          success: true,
          error: null,
          sleepLog,
        };
      } catch(err) {
        return {
          success: false,
          error: err.message,
          sleepLog: [],
        };
      }
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
  }
};
