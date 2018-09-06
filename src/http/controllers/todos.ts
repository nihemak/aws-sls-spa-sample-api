import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import middy from "@middy/core";
import { applyCommonMiddlewares } from "../utils/apply-common-middlewares";
import { requestValidator } from "../middlewares/request-validator";
import { container, TYPES } from "../../providers/inversify.config";
import { Todos } from "../../models/Todos";

export const create: middy.IMiddy = applyCommonMiddlewares(
  middy(async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    const todo = await container
      .get<Todos>(TYPES.Todos)
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
    const todos = await container.get<Todos>(TYPES.Todos).all();
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todos)
    });
  })
);

export const get: middy.IMiddy = applyCommonMiddlewares(
  middy(async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    const todo = await container
      .get<Todos>(TYPES.Todos)
      .get((event.pathParameters as any).id);
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
    const todo = await container
      .get<Todos>(TYPES.Todos)
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
      .get<Todos>(TYPES.Todos)
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
