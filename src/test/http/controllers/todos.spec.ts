import { describe, it } from "mocha";
import { expect } from "chai";
import { Context } from "aws-lambda";
import {
  create,
  list,
  get,
  update,
  destroy
} from "../../../http/controllers/todos";
import { container, TYPES } from "../../../providers/container";
import { injectable } from "inversify";
import { Todos as TodosUseCase } from "../../../usecases/Todos";
import Todo from "../../../entities/todo";

@injectable()
class TodosUseCaseMock implements TodosUseCase {
  public static create = (_text: string): Promise<Todo> => {
    return Promise.reject();
  };
  public create(text: string): Promise<Todo> {
    return TodosUseCaseMock.create(text);
  }

  public static list = (): Promise<Todo[]> => {
    return Promise.reject();
  };
  public list(): Promise<Todo[]> {
    return TodosUseCaseMock.list();
  }

  public static show = (_id: string): Promise<Todo | {}> => {
    return Promise.reject();
  };
  public show(id: string): Promise<Todo | {}> {
    return TodosUseCaseMock.show(id);
  }

  public static update = (
    _id: string,
    _text: string,
    _checked: boolean
  ): Promise<Todo> => {
    return Promise.reject();
  };
  public update(id: string, text: string, checked: boolean): Promise<Todo> {
    return TodosUseCaseMock.update(id, text, checked);
  }

  public static delete = (_id: string): Promise<void> => {
    return Promise.reject();
  };
  public delete(id: string): Promise<void> {
    return TodosUseCaseMock.delete(id);
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
      const todo: Todo = {
        id: "b24bd9b3-9517-4c43-9d7e-858969ea9483",
        text: "foo",
        checked: false,
        createdAt: 1536101150360,
        updatedAt: 1536101150362
      };

      const event = {
        headers: {
          "Content-Type": "application/json"
        },
        httpMethod: "POST",
        body: JSON.stringify({ text: todo.text })
      };

      TodosUseCaseMock.create = (text: string): Promise<Todo> => {
        expect(text).to.equal(todo.text);

        return Promise.resolve(todo);
      };
      container.rebind<TodosUseCase>(TYPES.USECASE_TODOS).to(TodosUseCaseMock);

      create(event, dummyContext, (err, response) => {
        expect(err).to.equal(null);

        expect(response).to.deep.include({
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers":
              "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Cache-control,Pragma,X-Frame-Options",
            "Access-Control-Allow-Origin": "*"
          }
        });

        const body = JSON.parse(response.body);
        expect(body).to.deep.equal(todo);

        done();
      });
    });
  });

  describe("#list", () => {
    it("should success response when success handler.", done => {
      const todos: Todo[] = [];
      todos.push({
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      });
      todos.push({
        text: "bar",
        id: "88D85019-AC42-408A-95FC-910E13CE79D8",
        checked: false,
        createdAt: 1536101177360,
        updatedAt: 1536199199360
      });

      const event = {
        httpMethod: "GET"
      };

      TodosUseCaseMock.list = (): Promise<Todo[]> => {
        return Promise.resolve(todos);
      };
      container.rebind<TodosUseCase>(TYPES.USECASE_TODOS).to(TodosUseCaseMock);

      list(event, dummyContext, (err, response) => {
        expect(err).to.equal(null);

        expect(response).to.deep.include({
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers":
              "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Cache-control,Pragma,X-Frame-Options",
            "Access-Control-Allow-Origin": "*"
          }
        });

        const body = JSON.parse(response.body);
        expect(body).to.deep.equal(todos);

        done();
      });
    });
  });

  describe("#get", () => {
    it("should success response when success handler.", done => {
      const todo: Todo = {
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      };

      const event = {
        httpMethod: "GET",
        pathParameters: {
          id: todo.id
        }
      };

      TodosUseCaseMock.show = (id: string): Promise<Todo | {}> => {
        expect(id).to.equal(todo.id);

        return Promise.resolve(todo);
      };
      container.rebind<TodosUseCase>(TYPES.USECASE_TODOS).to(TodosUseCaseMock);

      get(event, dummyContext, (err, response) => {
        expect(err).to.equal(null);

        expect(response).to.deep.include({
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers":
              "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Cache-control,Pragma,X-Frame-Options",
            "Access-Control-Allow-Origin": "*"
          }
        });

        const body = JSON.parse(response.body);
        expect(body).to.deep.equal(todo);

        done();
      });
    });
  });

  describe("#update", () => {
    it("should success response when success handler.", done => {
      const todo: Todo = {
        text: "foo",
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B",
        checked: true,
        createdAt: 1536101188360,
        updatedAt: 1536101199360
      };

      const event = {
        headers: {
          "Content-Type": "application/json"
        },
        httpMethod: "PUT",
        pathParameters: {
          id: todo.id
        },
        body: JSON.stringify({
          text: todo.text,
          checked: todo.checked
        })
      };

      TodosUseCaseMock.update = (
        id: string,
        text: string,
        checked: boolean
      ): Promise<Todo> => {
        expect(id).to.equal(todo.id);
        expect(text).to.equal(todo.text);
        expect(checked).to.equal(todo.checked);

        return Promise.resolve(todo);
      };
      container.rebind<TodosUseCase>(TYPES.USECASE_TODOS).to(TodosUseCaseMock);

      update(event, dummyContext, (err, response) => {
        expect(err).to.equal(null);

        expect(response.statusCode).to.equal(200);

        const body = JSON.parse(response.body);
        expect(body).to.deep.equal(todo);

        done();
      });
    });
  });

  describe("#destroy", () => {
    it("should success response when success handler.", done => {
      const todo = {
        id: "FD46591-5827-4678-BC5E-15C02B48BD4B"
      };

      const event = {
        httpMethod: "DELETE",
        pathParameters: {
          id: todo.id
        }
      };

      TodosUseCaseMock.delete = (id: string): Promise<void> => {
        expect(id).to.equal(todo.id);

        return Promise.resolve();
      };
      container.rebind<TodosUseCase>(TYPES.USECASE_TODOS).to(TodosUseCaseMock);

      destroy(event, dummyContext, (err, response) => {
        expect(err).to.equal(null);

        expect(response).to.deep.equal({
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers":
              "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Cache-control,Pragma,X-Frame-Options",
            "Access-Control-Allow-Origin": "*"
          },
          body: "{}"
        });

        done();
      });
    });
  });
});
