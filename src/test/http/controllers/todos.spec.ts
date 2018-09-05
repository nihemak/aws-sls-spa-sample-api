import { describe, it } from "mocha";
import { assert } from "chai";
import { Context } from "aws-lambda";
import { create, list, get, update } from "../../../http/controllers/todos";
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

  public static all = (): Promise<any> => {
    return Promise.resolve([]);
  };
  public all(): Promise<any> {
    return TodosMock.all();
  }

  public static get = (_id: string): Promise<any> => {
    return Promise.resolve({});
  };
  public get(id: string): Promise<any> {
    return TodosMock.get(id);
  }

  public static update = (
    _id: string,
    _text: string,
    _checked: boolean
  ): Promise<any> => {
    return Promise.resolve({});
  };
  public update(id: string, text: string, checked: boolean): Promise<any> {
    return TodosMock.update(id, text, checked);
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

  describe("#create", () => {
    it("should success response when success handler.", done => {
      const todo = {
        id: "b24bd9b3-9517-4c43-9d7e-858969ea9483",
        text: "foo",
        checked: false,
        createdAt: 1536101150360,
        updatedAt: 1536101150362
      };

      TodosMock.create = (text: string): Promise<any> => {
        assert.equal(text, todo.text);

        return Promise.resolve(todo);
      };
      container.rebind<ITodos>(TYPES.Todos).to(TodosMock);

      const event = {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: todo.text })
      };

      create(event, dummyContext, (err, response) => {
        assert.equal(err, null);

        assert.equal(response.statusCode, 200);

        const body = JSON.parse(response.body);
        assert.equal(body.text, todo.text);
        assert.equal(body.id, todo.id);
        assert.equal(body.checked, todo.checked);
        assert.equal(body.createdAt, todo.createdAt);
        assert.equal(body.updatedAt, todo.updatedAt);

        done();
      });
    });
  });

  describe("#list", () => {
    it("should success response when success handler.", done => {
      const todos: any = [];

      const todo1 = {
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      };
      todos.push(todo1);

      const todo2 = {
        text: "bar",
        id: "88D85019-AC42-408A-95FC-910E13CE79D8",
        checked: false,
        createdAt: 1536101177360,
        updatedAt: 1536199199360
      };
      todos.push(todo2);

      TodosMock.all = (): Promise<any> => {
        return Promise.resolve(todos);
      };
      container.rebind<ITodos>(TYPES.Todos).to(TodosMock);

      const event = {};

      list(event, dummyContext, (err, response) => {
        assert.equal(err, null);

        assert.equal(response.statusCode, 200);

        const body = JSON.parse(response.body);
        assert.equal(body.length, 2);

        assert.equal(body[0].text, todo1.text);
        assert.equal(body[0].id, todo1.id);
        assert.equal(body[0].checked, todo1.checked);
        assert.equal(body[0].createdAt, todo1.createdAt);
        assert.equal(body[0].updatedAt, todo1.updatedAt);

        assert.equal(body[1].text, todo2.text);
        assert.equal(body[1].id, todo2.id);
        assert.equal(body[1].checked, todo2.checked);
        assert.equal(body[1].createdAt, todo2.createdAt);
        assert.equal(body[1].updatedAt, todo2.updatedAt);

        done();
      });
    });
  });

  describe("#get", () => {
    it("should success response when success handler.", done => {
      const todo = {
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      };

      TodosMock.get = (id: string): Promise<any> => {
        assert.equal(id, todo.id);

        return Promise.resolve(todo);
      };
      container.rebind<ITodos>(TYPES.Todos).to(TodosMock);

      const event = {
        pathParameters: {
          id: todo.id
        }
      };

      get(event, dummyContext, (err, response) => {
        assert.equal(err, null);

        assert.equal(response.statusCode, 200);

        const body = JSON.parse(response.body);
        assert.equal(body.text, todo.text);
        assert.equal(body.id, todo.id);
        assert.equal(body.checked, todo.checked);
        assert.equal(body.createdAt, todo.createdAt);
        assert.equal(body.updatedAt, todo.updatedAt);

        done();
      });
    });
  });

  describe("#update", () => {
    it("should success response when success handler.", done => {
      const todo = {
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      };

      TodosMock.update = (
        id: string,
        text: string,
        checked: boolean
      ): Promise<any> => {
        assert.equal(id, todo.id);
        assert.equal(text, todo.text);
        assert.equal(checked, todo.checked);

        return Promise.resolve(todo);
      };
      container.rebind<ITodos>(TYPES.Todos).to(TodosMock);

      const event = {
        headers: {
          "Content-Type": "application/json"
        },
        pathParameters: {
          id: todo.id
        },
        body: JSON.stringify({
          text: todo.text,
          checked: todo.checked
        })
      };

      update(event, dummyContext, (err, response) => {
        assert.equal(err, null);

        assert.equal(response.statusCode, 200);

        const body = JSON.parse(response.body);
        assert.equal(body.text, todo.text);
        assert.equal(body.id, todo.id);
        assert.equal(body.checked, todo.checked);
        assert.equal(body.createdAt, todo.createdAt);
        assert.equal(body.updatedAt, todo.updatedAt);

        done();
      });
    });
  });
});
