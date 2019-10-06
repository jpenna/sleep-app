import { DataSource } from 'apollo-datasource';
import { ApolloServerExpressConfig } from 'apollo-server-express';

import UserModel from '../db/models/user';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';

type SleepRecordType = {
  startTime: String;
  endTime: String;
}

type UserType = {
  id: String;
  email: String;
}

export interface IDataSources extends DataSources<any> {
  userData: UserData
}

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

  updateSleepRecord({ startTime, endTime }: SleepRecordType) {

  }

  removeSleepRecord({ startTime }: { startTime: String }): String {

  }
}

export default (): IDataSources => ({
  userData: new UserData(),
});
