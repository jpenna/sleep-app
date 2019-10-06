import { IDataSources } from './dataSources';

interface IContext { dataSources: IDataSources, user: { email: String } }

export default {
  Query: {
    sleepRecord(startTime: String) {
      return {startTime: 123412312, endTime: 12341234 }
    },

    sleepList(_: any, __: any, { dataSources, user }: IContext) {
      console.log(user)
      return dataSources.userData.getSleepLog();
    },
  },

  Mutation: {
    updateSleep() {

    },

    removeSleep() {

    }
  }
};
