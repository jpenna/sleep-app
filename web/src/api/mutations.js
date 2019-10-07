import gql from 'graphql-tag';

export const ADD_OR_UPDATE_SLEEP = gql`
  mutation AddOrUpdateSleep($start: Date!, $end: Date) {
    updateSleep(startTime: $start, endTime: $end) {
      success
      error
      sleepRecord {
        _id
        startTime
        endTime
      }
    }
  }
`;
