import gql from 'graphql-tag';
import moment from 'moment';

function formatDuration(duration) {
  let hours = duration.hours().toString();
  let minutes = duration.minutes().toString();
  if (hours.length < 2) hours = `0${hours}`;
  if (minutes.length < 2) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
}

export const typeDefs = gql`
  extend type SleepRecord {
    id: String!
    date: String!
    startTime: String!
    endTime: String
    duration: String
  }
`;

export const resolvers = {
  SleepRecord: {
    id: (rec) => {
      return rec._id;
    },
    date: (rec) => {
      const startTime = moment(rec.startTime);
      return startTime.format('ddd, MMM DD YYYY');
    },
    startTime: (rec) => {
      const startTime = moment(rec.startTime);
      return startTime.format('LT');
    },
    endTime: (rec) => {
      const endTime = moment(rec.endTime);
      return endTime.format('LT');
    },
    duration: (rec) => {
      const startTime = moment(rec.startTime);
      const endTime = moment(rec.endTime);
      const duration = moment.duration(endTime.diff(startTime));
      return formatDuration(duration);
    },
  },
};
