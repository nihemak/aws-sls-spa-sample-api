import { describe, it } from "mocha";
import { expect } from "chai";
import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import middy from "@middy/core";
import { errorHandler } from "../../../http/middlewares/error-handler";

describe("http/middlewares/errorHandler", () => {
  const dummyContext: Context = {
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

  it("should success response when success handler.", done => {
    const handler: middy.IMiddy = middy(
      async (event: APIGatewayEvent, _: Context, cb: Callback) => {
        return cb(null, {
          statusCode: 200,
          body: JSON.stringify(event.body)
        });
      }
    );
    handler.use(errorHandler());

    const body = { foo: "bar" };
    const event = {
      body: body
    };

    handler(event, dummyContext, (err, response) => {
      expect(err).to.equal(null);
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.body)).to.deep.equal(body);
      done();
    });
  });

  it("should error response when error handler.", done => {
    const handler: middy.IMiddy = middy(
      async (_event: APIGatewayEvent, _: Context, _cb: Callback) => {
        return Promise.reject({
          statusCode: 300,
          message: "test",
          errors: []
        });
      }
    );
    handler.use(errorHandler());

    handler({}, dummyContext, (err, response) => {
      expect(err).to.equal(null);
      expect(response.statusCode).to.equal(300);
      expect(JSON.parse(response.body)).to.deep.equal({
        message: "test",
        errors: []
      });
      done();
    });
  });
});
