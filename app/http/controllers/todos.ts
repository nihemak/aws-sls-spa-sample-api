import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import middy from "@middy/core";
import { applyCommonMiddlewares } from "../utils/apply-common-middlewares";
import { requestValidator } from "../middlewares/request-validator";
import { container, TYPES } from "../../providers/container";
import { Todos as UseCase } from "../../usecases/Todos";
import {
  TodoCreateInput,
  TodoShowInput,
  TodoUpdateInput,
  TodoDeleteInput
} from "../../adapters/http/requests/Todos";
import {
  TodoCreateOutput,
  TodoListOutput,
  TodoShowOutput,
  TodoUpdateOutput,
  TodoDeleteOutput
} from "../../adapters/http/responses/Todos";

export const create: middy.IMiddy = applyCommonMiddlewares(
  middy(async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    await container
      .get<UseCase>(TYPES.USECASE_TODOS)
      .create(new TodoCreateInput(event.body as any), new TodoCreateOutput(cb));
  })
).use(
  requestValidator({
    text: ["required", "string"]
  })
);

export const list: middy.IMiddy = applyCommonMiddlewares(
  middy(async (_event: APIGatewayEvent, _: Context, cb: Callback) => {
    await container
      .get<UseCase>(TYPES.USECASE_TODOS)
      .list(new TodoListOutput(cb));
  })
);

export const get: middy.IMiddy = applyCommonMiddlewares(
  middy(async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    await container
      .get<UseCase>(TYPES.USECASE_TODOS)
      .show(
        new TodoShowInput(event.pathParameters as any),
        new TodoShowOutput(cb)
      );
  })
).use(
  requestValidator({
    id: ["required", "string"]
  })
);

export const update: middy.IMiddy = applyCommonMiddlewares(
  middy(async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    await container
      .get<UseCase>(TYPES.USECASE_TODOS)
      .update(
        new TodoUpdateInput(event.pathParameters as any, event.body as any),
        new TodoUpdateOutput(cb)
      );
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
      .delete(
        new TodoDeleteInput(event.pathParameters as any),
        new TodoDeleteOutput(cb)
      );
  })
).use(
  requestValidator({
    id: ["required", "string"]
  })
);
