import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    sleepRecord: SleepRecord
    sleepList: [SleepRecord!]!
  }

  type Mutation {
    updateSleep(
      id: ID
      startTime: String!
      endTime: String!
    ): SleepUpdateResponse!
    removeSleep(id: ID): RemoveSleepResponse!
  }

  type SleepRecord {
    id: ID!
    startTime: String!
    endTime: String!
  }

  type SleepUpdateResponse {
    success: Boolean!
    error: String
    sleepRecord: SleepRecord!
  }

  type RemoveSleepResponse {
    success: Boolean!
    error: String
    id: ID!
  }
`;
