import gql from 'graphql-tag';

export const GET_SLEEP_LOG = gql`
  query GetList($from: Date, $to: Date) {
    sleepLog(from: $from, to: $to) {
      success
      error
      sleepLog {
        _id
        startTime
        endTime
      }
    }
  }
`;
