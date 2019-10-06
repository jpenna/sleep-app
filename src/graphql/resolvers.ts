export default {
  Query: {
    sleepRecord: (id: String) => ({ startTime: 123412312, endTime: 12341234 }),
    sleepList: (
      startTime: String | Number,
      endTime: String | Number = Date.now(),
      ) => ({
        startTime: 123412312,
        endTime: 12341234,
      }),
  },
};
