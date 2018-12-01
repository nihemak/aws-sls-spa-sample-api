import { describe, it } from "mocha";
import { expect } from "chai";
import { HttpContextDummy } from "test/utils/HttpContextDummy";
import { create, list, get, update, destroy } from "app/http/controllers/todos";
import { container, TYPES } from "app/providers/container";
import { Todos as TodosUseCase } from "app/usecases/Todos";
import {
  TodoCreateInput,
  TodoListInput,
  TodoShowInput,
  TodoUpdateInput,
  TodoDeleteInput
} from "app/usecases/inputs/Todos";
import {
  TodoCreateOutput,
  TodoListOutput,
  TodoShowOutput,
  TodoUpdateOutput,
  TodoDeleteOutput
} from "app/usecases/outputs/Todos";
import { UseCaseTodosMock } from "test/utils/UseCaseTodosMock";
import { Todo } from "app/entities/Todo";

describe("http/controllers/todos", () => {
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

      UseCaseTodosMock.create = (
        input: TodoCreateInput,
        output: TodoCreateOutput
      ): Promise<void> => {
        expect(input.getText()).to.equal(todo.text);
        output.success(todo);

        return Promise.resolve();
      };
      container.rebind<TodosUseCase>(TYPES.USECASE_TODOS).to(UseCaseTodosMock);

      create(event, HttpContextDummy, (err, response) => {
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
        headers: {},
        httpMethod: "GET"
      };

      UseCaseTodosMock.list = (
        _input: TodoListInput,
        output: TodoListOutput
      ): Promise<void> => {
        output.success(todos);
        return Promise.resolve();
      };
      container.rebind<TodosUseCase>(TYPES.USECASE_TODOS).to(UseCaseTodosMock);

      list(event, HttpContextDummy, (err, response) => {
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
        headers: {},
        httpMethod: "GET",
        pathParameters: {
          id: todo.id
        }
      };

      UseCaseTodosMock.show = (
        input: TodoShowInput,
        output: TodoShowOutput
      ): Promise<void> => {
        expect(input.getId()).to.equal(todo.id);
        output.success(todo);

        return Promise.resolve();
      };
      container.rebind<TodosUseCase>(TYPES.USECASE_TODOS).to(UseCaseTodosMock);

      get(event, HttpContextDummy, (err, response) => {
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

      UseCaseTodosMock.update = (
        input: TodoUpdateInput,
        output: TodoUpdateOutput
      ): Promise<void> => {
        expect(input.getId()).to.equal(todo.id);
        expect(input.getText()).to.equal(todo.text);
        expect(input.getChecked()).to.equal(todo.checked);
        output.success(todo);

        return Promise.resolve();
      };
      container.rebind<TodosUseCase>(TYPES.USECASE_TODOS).to(UseCaseTodosMock);

      update(event, HttpContextDummy, (err, response) => {
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
        headers: {},
        httpMethod: "DELETE",
        pathParameters: {
          id: todo.id
        }
      };

      UseCaseTodosMock.delete = (
        input: TodoDeleteInput,
        output: TodoDeleteOutput
      ): Promise<void> => {
        const todoId: string = input.getId();
        expect(todoId).to.equal(todo.id);
        output.success(todoId);

        return Promise.resolve();
      };
      container.rebind<TodosUseCase>(TYPES.USECASE_TODOS).to(UseCaseTodosMock);

      destroy(event, HttpContextDummy, (err, response) => {
        expect(err).to.equal(null);

        expect(response).to.deep.equal({
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers":
              "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Cache-control,Pragma,X-Frame-Options",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({ id: todo.id })
        });

        done();
      });
    });
  });
});
