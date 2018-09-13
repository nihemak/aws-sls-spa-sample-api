import { Context } from "aws-lambda";

export const HttpContextDummy: Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: "dummy",
  functionVersion: "dummy",
  invokedFunctionArn: "dummy",
  memoryLimitInMB: 9999,
  awsRequestId: "dummy",
  logGroupName: "dummy",
  logStreamName: "dummy",
  getRemainingTimeInMillis: () => {
    return 0;
  },
  done: () => {
    return;
  },
  fail: () => {
    return;
  },
  succeed: () => {
    return;
  }
};
