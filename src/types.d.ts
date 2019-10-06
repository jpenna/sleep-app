import { Model, Schema, Document } from 'mongoose';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import { UserData } from './graphql/dataSources';

export type updateSleepLogParamsType = { email: string, startTime: string, endTime: string };

export interface IUserSchema extends Model<IUser> {
  updateSleepLog(params: updateSleepLogParamsType): Schema
}

export type SleepRecordType = {
  startTime: number;
  endTime: number;
};

export interface IUser extends Document {
  id: string;
  email: string;
  sleepLog: [SleepRecordType];
}

interface IApolloContent { dataSources: IDataSources, user: { email: string } }

type UserType = {
  id: String;
  email: String;
}

export interface IDataSources extends DataSources<UserData> {
  userData: UserData
}
