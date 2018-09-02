import { describe, it } from "mocha";
import { assert } from "chai";
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

    const event = {
      body: { foo: "bar" }
    };

    handler(event, dummyContext, (err, response) => {
      assert.equal(err, null);
      assert.equal(response.statusCode, 200);
      assert.equal(JSON.parse(response.body).foo, "bar");
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
      assert.equal((err as any).statusCode, 400);
      assert.equal((err as any).message, "There is an error in the parameter.");
      assert.equal((err as any).errors.length, 1);
      assert.equal((err as any).errors[0].field, "foo");
      assert.equal(response, null);
      done();
    });
  });
});
