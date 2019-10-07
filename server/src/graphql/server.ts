import { ApolloServer } from 'apollo-server-express';

import userModel from '../db/models/user';

import typeDefs from './schema';
import resolvers from './resolvers';
import dataSources from './dataSources';

export default new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: async ({ req }) => {
    const email = req.headers && req.headers.authorization || '';
    if (!email) return { user: null };
    const user = await userModel.findOne({ email }, '-sleepLog')
      .then((user) => {
        return user || userModel.create({ email });
      });
    return { user };
  }
});
