import { UserType, SleepRecordType, IUser, IDataSources, GetSleepLogParamsType } from 'src/types';
import { DataSource } from 'apollo-datasource';
import { ApolloServerExpressConfig } from 'apollo-server-express';

import UserModel from '../db/models/user';

export class UserData extends DataSource {
  context: ApolloServerExpressConfig['context']

  initialize(config: ApolloServerExpressConfig) {
    this.context = config.context;
  }

  async getSleepLog({ email, from, to }: GetSleepLogParamsType): Promise<IUser['sleepLog']> {
    return await UserModel.getSleepLog({ email, from, to });
  }

  updateSleepRecord(userEmail: IUser['email'], { startTime, endTime }: { startTime: Date, endTime: Date }): Promise<SleepRecordType> {
    return UserModel.updateSleepLog({ email: userEmail, startTime, endTime });
  }

  deleteSleepRecord(userEmail: IUser['email'], { sleepId }: { sleepId: SleepRecordType['_id'] }): Promise<boolean> {
    return UserModel.deleteSleepRecord({ email: userEmail, sleepId });
  }
}

export default (): IDataSources => ({
  userData: new UserData(),
});
