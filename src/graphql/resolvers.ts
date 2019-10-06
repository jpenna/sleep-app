import { SleepRecordType, IApolloContent } from 'src/types';

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
    updateSleep(_: any, { startTime, endTime }: SleepRecordType, { dataSources, user }: IApolloContent) {
      return dataSources.userData.updateSleepRecord(user.email, { startTime, endTime })
    },

    removeSleep() {

    }
  }
};
