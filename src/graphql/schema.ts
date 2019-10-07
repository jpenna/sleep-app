import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    sleepLog(
      from: String,
      to: String,
    ): SleepLogResponse
  }

  type Mutation {
    updateSleep(
      startTime: String!
      endTime: String
    ): SleepUpdateResponse!
  }

  type SleepRecord {
    startTime: ID!
    endTime: String
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
`;
