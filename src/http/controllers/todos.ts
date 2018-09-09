import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import middy from "@middy/core";
import { applyCommonMiddlewares } from "../utils/apply-common-middlewares";
import { requestValidator } from "../middlewares/request-validator";
import { container, TYPES } from "../../providers/container";
import Todo from "../../entities/todo";
import { Todos as UseCase } from "../../usecases/Todos";

export const create: middy.IMiddy = applyCommonMiddlewares(
  middy(async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    const todo: Todo = await container
      .get<UseCase>(TYPES.USECASE_TODOS)
      .create((event.body as any).text);
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  })
).use(
  requestValidator({
    text: ["required", "string"]
  })
);

export const list: middy.IMiddy = applyCommonMiddlewares(
  middy(async (_event: APIGatewayEvent, _: Context, cb: Callback) => {
    const todos: Todo[] = await container
      .get<UseCase>(TYPES.USECASE_TODOS)
      .list();
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todos)
    });
  })
);

export const get: middy.IMiddy = applyCommonMiddlewares(
  middy(async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    const todo: Todo | {} = await container
      .get<UseCase>(TYPES.USECASE_TODOS)
      .show((event.pathParameters as any).id);
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  })
).use(
  requestValidator({
    id: ["required", "string"]
  })
);

export const update: middy.IMiddy = applyCommonMiddlewares(
  middy(async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    const todo: Todo = await container
      .get<UseCase>(TYPES.USECASE_TODOS)
      .update(
        (event.pathParameters as any).id,
        (event.body as any).text,
        (event.body as any).checked
      );
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  })
).use(
  requestValidator({
    id: ["required", "string"],
    text: ["required", "string"],
    checked: ["required", "boolean"]
  })
);

export const destroy: middy.IMiddy = applyCommonMiddlewares(
  middy(async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    await container
      .get<UseCase>(TYPES.USECASE_TODOS)
      .delete((event.pathParameters as any).id);
    cb(null, {
      statusCode: 200,
      body: JSON.stringify({})
    });
  })
).use(
  requestValidator({
    id: ["required", "string"]
  })
);
