import mongoose from 'mongoose';

const dbPort = process.env.MONGO_PORT ? `:${process.env.MONGO_PORT}` : '';
const dbUri = `${process.env.MONGO_PROTOCOL || 'mongodb'}://${process.env.MONGO_HOST}${dbPort}`;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  dbName: process.env.MONGO_DB,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
};

const database = mongoose.connection;

function connectMongoDB() {
  mongoose.connect(dbUri, options)
    .catch((error) => {
      console.error(`Error in MongoDb connection: ${error}`)
    });
}

database.on('connecting', (): void => console.log('Connecting to MongoDB...'));
database.on('connected', (): void => console.log('MongoDB connected!'));
database.once('open', (): void => console.log('MongoDB connection opened!'));
database.on('reconnected', (): void => console.log('MongoDB reconnected!'));
database.on('disconnected', (): void => {
  console.log('MongoDB disconnected! Retrying in 3 seconds...');
  setTimeout(connectMongoDB, 3000);
});

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

connectMongoDB();
