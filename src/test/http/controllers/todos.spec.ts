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
import {
  TodoCreateInput,
  TodoShowInput,
  TodoUpdateInput,
  TodoDeleteInput
} from "../../../usecases/inputs/Todos";
import {
  TodoCreateOutput,
  TodoListOutput,
  TodoShowOutput,
  TodoUpdateOutput,
  TodoDeleteOutput
} from "../../../usecases/outputs/Todos";
import Todo from "../../../entities/todo";

@injectable()
class TodosUseCaseMock implements TodosUseCase {
  public static create = (
    _input: TodoCreateInput,
    _output: TodoCreateOutput
  ): Promise<void> => {
    return Promise.reject();
  };
  public create(
    input: TodoCreateInput,
    output: TodoCreateOutput
  ): Promise<void> {
    return TodosUseCaseMock.create(input, output);
  }

  public static list = (_output: TodoListOutput): Promise<void> => {
    return Promise.reject();
  };
  public list(output: TodoListOutput): Promise<void> {
    return TodosUseCaseMock.list(output);
  }

  public static show = (
    _input: TodoShowInput,
    _output: TodoShowOutput
  ): Promise<void> => {
    return Promise.reject();
  };
  public show(input: TodoShowInput, output: TodoShowOutput): Promise<void> {
    return TodosUseCaseMock.show(input, output);
  }

  public static update = (
    _input: TodoUpdateInput,
    _output: TodoUpdateOutput
  ): Promise<void> => {
    return Promise.reject();
  };
  public update(
    input: TodoUpdateInput,
    output: TodoUpdateOutput
  ): Promise<void> {
    return TodosUseCaseMock.update(input, output);
  }

  public static delete = (
    _input: TodoDeleteInput,
    _output: TodoDeleteOutput
  ): Promise<void> => {
    return Promise.reject();
  };
  public delete(
    input: TodoDeleteInput,
    output: TodoDeleteOutput
  ): Promise<void> {
    return TodosUseCaseMock.delete(input, output);
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

      TodosUseCaseMock.create = (
        input: TodoCreateInput,
        output: TodoCreateOutput
      ): Promise<void> => {
        expect(input.getText()).to.equal(todo.text);
        output.success(todo);

        return Promise.resolve();
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

      TodosUseCaseMock.list = (output: TodoListOutput): Promise<void> => {
        output.success(todos);
        return Promise.resolve();
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

      TodosUseCaseMock.show = (
        input: TodoShowInput,
        output: TodoShowOutput
      ): Promise<void> => {
        expect(input.getId()).to.equal(todo.id);
        output.success(todo);

        return Promise.resolve();
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
        input: TodoUpdateInput,
        output: TodoUpdateOutput
      ): Promise<void> => {
        expect(input.getId()).to.equal(todo.id);
        expect(input.getText()).to.equal(todo.text);
        expect(input.getChecked()).to.equal(todo.checked);
        output.success(todo);

        return Promise.resolve();
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

      TodosUseCaseMock.delete = (
        input: TodoDeleteInput,
        output: TodoDeleteOutput
      ): Promise<void> => {
        expect(input.getId()).to.equal(todo.id);
        output.success();

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
