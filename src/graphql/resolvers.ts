import { SleepRecordType, IApolloContent, GetSleepLogParamsType } from 'src/types';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default {
  Query: {
    async sleepLog(_: any, { from, to }: GetSleepLogParamsType, { dataSources, user }: IApolloContent) {
      try {
        if (from >= to) throw new Error('`from` value should be before `to` value.');
        const sleepLog = await dataSources.userData.getSleepLog({ email: user.email, from, to });
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
        const sleepRecord = await dataSources.userData.updateSleepRecord(user.email, { startTime, endTime });
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
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(parseInt(value)); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
};
