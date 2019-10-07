import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL,
  headers: { authorization: 'john@snow.com' },
});

const client = new ApolloClient({
  cache,
  link,
});

client
  .query({
    query: gql`
      query GetList {
        sleepLog(from: "970378100300", to: "1070378100415") {
          success
          error
          sleepLog {
            _id
            startTime
            endTime
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));
