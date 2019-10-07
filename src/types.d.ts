import { Model, Schema, Document } from 'mongoose';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import { UserData } from './graphql/dataSources';

export type UpdateSleepLogParamsType = { email: string, startTime: number, endTime: number };
export type GetSleepLogParamsType = { email: string, from: number, to: number };

export interface IUserSchema extends Model<IUser> {
  updateSleepLog(params: UpdateSleepLogParamsType): Promise<SleepRecordType>
  getSleepLog(params: GetSleepLogParamsType): Promise<IUser['sleepLog']>
}

export type SleepRecordType = {
  startTime: number;
  endTime: number;
};

export interface IUser extends Document {
  id: string;
  email: string;
  sleepLog: SleepRecordType[];
}

interface IApolloContent { dataSources: IDataSources, user: { email: string } }

type UserType = {
  id: String;
  email: String;
}

export interface IDataSources extends DataSources<UserData> {
  userData: UserData
}
