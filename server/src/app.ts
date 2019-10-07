require('dotenv').config();
import express from 'express';

import './db/connect';
import apolloServer from './graphql/server';

const app = express();
apolloServer.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
);
