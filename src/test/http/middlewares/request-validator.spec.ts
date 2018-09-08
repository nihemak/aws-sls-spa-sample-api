import { describe, it } from "mocha";
import { expect } from "chai";
import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import middy from "@middy/core";
import { requestValidator } from "../../../http/middlewares/request-validator";

describe("http/middlewares/requestValidator", () => {
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

  it("should success when rules match.", done => {
    const handler: middy.IMiddy = middy(
      async (event: APIGatewayEvent, _: Context, cb: Callback) => {
        return cb(null, {
          statusCode: 200,
          body: JSON.stringify(event.body)
        });
      }
    );
    const rules = {
      foo: ["required", "string"]
    };
    handler.use(requestValidator(rules));

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

  it("should error when rules does not match.", done => {
    const handler: middy.IMiddy = middy(
      async (event: APIGatewayEvent, _: Context, cb: Callback) => {
        return cb(null, {
          statusCode: 200,
          body: JSON.stringify(event.body)
        });
      }
    );
    const rules = {
      foo: ["required", "string"]
    };
    handler.use(requestValidator(rules));

    const event = {
      body: { foo2: "bar" }
    };
    handler(event, dummyContext, (err, response) => {
      expect(err as any).to.deep.equal({
        statusCode: 400,
        message: "There is an error in the parameter.",
        errors: [{ field: "foo", message: "The foo field is required." }]
      });
      expect(response).to.equal(undefined);
      done();
    });
  });
});
