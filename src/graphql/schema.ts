import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    sleepRecord: SleepRecord
    sleepList: [SleepRecord!]!
  }

  type Mutation {
    updateSleep(
      startTime: Float!
      endTime: Float
    ): SleepUpdateResponse!

    removeSleep(startTime: ID): RemoveSleepResponse!
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

  type RemoveSleepResponse {
    startTime: String!
    success: Boolean!
    error: String
  }
`;
