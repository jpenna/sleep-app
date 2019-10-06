import { UserType, SleepRecordType, IUser, IDataSources } from 'src/types';
import { DataSource } from 'apollo-datasource';
import { ApolloServerExpressConfig } from 'apollo-server-express';

import UserModel from '../db/models/user';

export class UserData extends DataSource {
  context: ApolloServerExpressConfig['context']

  initialize(config: ApolloServerExpressConfig) {
    this.context = config.context;
  }

  async updateUser({ id = 'abc', email = 'abc@email.com' }: UserType) {
    const user = await UserModel.findByIdAndUpdate(id, { $set: { email } }, { new: true  })
  }

  getSleepLog(): [SleepRecordType] {
    return [{
      startTime: 'oi',
      endTime: 'bye',
    }]
  }

  async updateSleepRecord(userEmail: IUser['email'], { startTime, endTime }: SleepRecordType) {
    return await UserModel.updateSleepLog({ email: userEmail, startTime, endTime });
  }

  removeSleepRecord({ startTime }: { startTime: SleepRecordType['startTime'] }): SleepRecordType['startTime'] | null {
    return startTime;
  }
}

export default (): IDataSources => ({
  userData: new UserData(),
});
