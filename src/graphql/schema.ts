import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    sleepLog(
      from: Date,
      to: Date,
    ): SleepLogResponse
  }

  type Mutation {
    updateSleep(
      startTime: Date!
      endTime: Date
    ): SleepUpdateResponse!

    removeSleep(
      sleepId: String!
    ): RemoveSleepResponse!
  }

  type SleepRecord {
    _id: ID!
    startTime: Date!
    endTime: Date
  }

  type SleepUpdateResponse {
    success: Boolean!
    error: String
    sleepRecord: SleepRecord
  }

  type SleepLogResponse {
    success: Boolean!
    error: String
    sleepLog: [SleepRecord!]!
  }

  type RemoveSleepResponse {
    success: Boolean!
    error: String
  }

  scalar Date
`;
