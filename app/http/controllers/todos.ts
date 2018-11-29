import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import middy from "@middy/core";
import { applyCommonMiddlewares } from "app/http/utils/apply-common-middlewares";
import { requestValidator } from "app/http/middlewares/request-validator";
import { container, TYPES } from "app/providers/container";
import { Todos as UseCase } from "app/usecases/Todos";
import {
  TodoCreateInput,
  TodoShowInput,
  TodoUpdateInput,
  TodoDeleteInput
} from "app/adapters/http/requests/Todos";
import {
  TodoCreateOutput,
  TodoListOutput,
  TodoShowOutput,
  TodoUpdateOutput,
  TodoDeleteOutput
} from "app/adapters/http/responses/Todos";
import jwk from "jsonwebtoken";

function getAuthUserId(headers: { [name: string]: string }): string {
  let userId = headers["Authorization"];
  if (process.env.USER_POOL_ID !== "Dummy") {
    const decodedJwt: any = jwk.decode(userId, { complete: true });
    userId = decodedJwt.payload.sub;
  }
  console.log(userId);
  return userId;
}

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
    const userId = getAuthUserId(_event.headers);
    console.log(userId);

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
    text: ["string"],
    checked: ["boolean"]
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
