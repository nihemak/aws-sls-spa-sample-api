import { describe, it } from "mocha";
import { assert } from "chai";
import { Context } from "aws-lambda";
import { create } from "../../../http/controllers/todos";
import { container, TYPES } from "../../../providers/inversify.config";
import { injectable } from "inversify";
import { Todos as ITodos } from "../../../models/Todos";

@injectable()
class TodosMock implements ITodos {
  public static create = (_text: string): Promise<any> => {
    return Promise.resolve({});
  };
  public create(text: string): Promise<any> {
    return TodosMock.create(text);
  }

  public all(): Promise<any> {
    return Promise.resolve({});
  }

  public get(_id: string): Promise<any> {
    return Promise.resolve({});
  }

  public update(_id: string, _text: string, _checked: boolean): Promise<any> {
    return Promise.resolve({});
  }

  public delete(_id: string): Promise<any> {
    return Promise.resolve({});
  }

  public createTable(_rc: number, _wc: number): Promise<void> {
    return Promise.resolve();
  }
}

describe("http/controllers/todos", () => {
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

  describe('#create', () => {
    it("should success response when success handler.", done => {
      const todoId = "b24bd9b3-9517-4c43-9d7e-858969ea9483";
      const todoText = "foo";
      const todoChecked = false;
      const todoCreatedAt = 1536101150360;
      const todoUpdatedAt = 1536101150362;

      TodosMock.create = (text: string): Promise<any> => {
        assert.equal(text, todoText);

        return Promise.resolve({
          text: text,
          id: todoId,
          checked: todoChecked,
          createdAt: todoCreatedAt,
          updatedAt: todoUpdatedAt
        });
      };
      container.rebind<ITodos>(TYPES.Todos).to(TodosMock);

      const event = {
        body: { text: todoText }
      };

      create(event, dummyContext, (err, response) => {
        assert.equal(err, null);

        assert.equal(response.statusCode, 200);

        const body = JSON.parse(response.body);
        assert.equal(body.text, todoText);
        assert.equal(body.id, todoId);
        assert.equal(body.checked, todoChecked);
        assert.equal(body.createdAt, todoCreatedAt);
        assert.equal(body.updatedAt, todoUpdatedAt);

        done();
      });
    });
  });
});
